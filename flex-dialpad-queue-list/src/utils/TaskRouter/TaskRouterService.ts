import * as Flex from '@twilio/flex-ui';
import ApiService from '../ApiService';
import { WorkerInfoType } from '../../types/queue-list/types';
import { TaskRouterResponse } from '../../types/queue-list/types';

class TaskRouterService extends ApiService {
  async getQueueInfo(
    config: WorkerInfoType
  ): Promise<TaskRouterResponse[] | undefined> {
    try {
      const response = await this.#getQueueInfo(config);

      if (response === undefined) {
        return [];
      }

      return response;
    } catch (error) {
      console.log('Unable to get TaskRouter data', error);
    }
  }

  #getQueueInfo = async (
    config: WorkerInfoType
  ): Promise<TaskRouterResponse[] | []> => {
    const manager = Flex.Manager.getInstance();

    const params = {
      ...config,
      Token: manager.user.token,
    };

    const response: TaskRouterResponse[] | [] = await this.fetchJsonWithReject<
      TaskRouterResponse[] | []
    >(`${process.env.REACT_APP_TWILIO_SERVERLESS_SERVICE}/getQueues`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    return {
      ...response,
    };
  };
}

export default new TaskRouterService();
