import { SvelteKitAuth } from "@auth/sveltekit";
import Cognito from '@auth/core/providers/cognito'
import { COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET, COGNITO_ISSUER } from '$env/static/private'
import type { TokenSet } from "@auth/core/types";

export const handle = SvelteKitAuth({
  providers: [
    Cognito({
      clientId: COGNITO_CLIENT_ID,
      clientSecret: COGNITO_CLIENT_SECRET,
      issuer: COGNITO_ISSUER,
    })
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          access_token: account.access_token,
          expires_at: Date.now() + account.expires_in * 1000,
          refresh_token: account.refresh_token,
          id_token: account.id_token
        }
      } else if (!!token.expires_at && Date.now() < token.expires_at) {
        console.log('token not yet expired')
        // If the access token has not expired yet, return it
        return token
      } else {
        console.log("Access token has expires, attempting refresh...")
        console.log('token:', token)
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const clientSecretBasic = Buffer.from(`${COGNITO_CLIENT_ID}:${COGNITO_CLIENT_SECRET}`).toString('base64')

          const response = await fetch("https://jaby-house.auth.eu-west-1.amazoncognito.com/oauth2/token", {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Basic ${clientSecretBasic}`
            },
            body: new URLSearchParams({
              client_id: COGNITO_CLIENT_ID,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
            method: "POST",
          })

          const tokens: TokenSet = await response.json()
          console.log('tokens:', tokens)

          if (!response.ok) throw tokens

          const newExpiry = Date.now() + tokens.expires_in * 1000
          console.log('new expiry:', newExpiry)

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: newExpiry,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
            id_token: tokens.id_token
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    },
    session: ({ session, token }) => {
      session.id_token = token.id_token
      session.error = token.error
      return session
    }
  },
})

// For when token refresh becomes a problem: https://authjs.dev/guides/basics/refresh-token-rotation