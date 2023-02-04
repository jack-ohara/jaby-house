import { HouseholdClient } from "$lib/householdClient"
import { ScheduleClient } from "$lib/scheduleClient"
import { TaskClient } from "$lib/taskClient"
import { redirectToLoginPage } from "$lib/util/redirectToLoginPage"
import { redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession()
  if (!session?.user) {
    redirectToLoginPage()

    // Return isn't necessary as the above will throw an error
    // but typescript doesn't seem to know that
    return
  }

  try {
    const householdClient = new HouseholdClient(session)
    const scheduleClient = new ScheduleClient(session)

    const [household, schedule] = await Promise.all([householdClient.getHousehold(), scheduleClient.getSchedule()])

    if (!household) {
      throw redirect(301, '/household')
    }

    return {
      household,
      schedule: schedule as { tasksByDay: Record<string, any[]>},
      title: 'Schedule'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if ('status' in e && 'location' in e) {
      throw e
    }

    console.log('error retrieving household:', e)
    return {
      title: 'Schedule'
    }
  }
}

export const actions: Actions = {
  createNewTask: async ({ locals, request }) => {
    const session = await locals.getSession()
    if (!session?.user) {
      redirectToLoginPage()

      // Return isn't necessary as the above will throw an error
      // but typescript doesn't seem to know that
      return
    }

    const data = await request.formData()

    const payload: Record<string, string | number | undefined> = {
      name: data.get('new-task-name')?.toString(),
      assignee: data.get('new-task-assigned-user')?.toString()
    }

    if (data.has('new-task-due-date')) {
      payload['dueDate'] = new Date(data.get('new-task-due-date')!.toString()).valueOf()
    }

    const taskClient = new TaskClient(session)

    await taskClient.createTask(payload)
  }
}
