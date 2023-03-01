import { API_BASE_URL } from '$env/static/private';
import type { Session } from '@auth/core/types';
import { Client } from './client';

export class TaskClient extends Client {
  private base_url: string;

  constructor(session: Session) {
    super(session);

    this.base_url = `${API_BASE_URL}/schedule/task`;
  }

  async createTask(payload: Record<string, string | number | undefined>) {
    try {
      const response = await fetch(this.base_url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.auth_token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        return;
      }

      throw new Error(`Error creating a new task: ${response}`);
    } catch (e) {
      console.log('error creating task:', e);
      throw e;
    }
  }

  async updateTask(taskId: string, payload: Record<string, string | number | undefined>) {
    try {
      const response = await fetch(`${this.base_url}/${taskId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.auth_token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        return;
      }

      throw new Error(`Error updating a task: ${response}`);
    } catch (e) {
      console.log('error updating task:', e);
      throw e;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const response = await fetch(`${this.base_url}/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.auth_token}`
        }
      });

      if (response.ok) {
        return;
      }

      throw new Error(`Error delete task ${taskId}: ${JSON.stringify(response, null, 2)}`);
    } catch (e) {
      console.log(`Error deleting task: ${JSON.stringify(e, null, 2)}`);

      throw e;
    }
  }
}
