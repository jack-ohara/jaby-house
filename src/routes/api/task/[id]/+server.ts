import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { TaskClient } from '$lib/taskClient';

export async function PUT({ locals, params, request }: RequestEvent): Promise<Response> {
  const session = await locals.getSession();

  if (!session) {
    throw error(401, 'You must be logged in to use this endpoint');
  }

  const taskClient = new TaskClient(session);

  await taskClient.updateTask(params.id, await request.json());

  return new Response();
}
