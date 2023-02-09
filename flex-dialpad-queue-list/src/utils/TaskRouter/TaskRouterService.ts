import * as Flex from '@twilio/flex-ui';
import ApiService from '../ApiService';
import { WorkerInfoType } from '../../types/queue-list/types';
import { ServerlessResponse } from '../../types/queue-list/types';

class TaskRouterService extends ApiService {
  async getQueueInfo(
    config: WorkerInfoType
  ): Promise<ServerlessResponse | undefined> {
    try {
      const response = await this.#getQueueInfo(config);

      if (response === undefined) {
        return;
      }

      return response;
    } catch (error) {
      console.log('Unable to get TaskRouter data', error);
    }
  }

  #getQueueInfo = async (
    config: WorkerInfoType
  ): Promise<ServerlessResponse | undefined> => {
    const manager = Flex.Manager.getInstance();

    const params = {
      ...config,
      Token: manager.user.token,
    };

    const response: ServerlessResponse | undefined =
      await this.fetchJsonWithReject<ServerlessResponse | undefined>(
        `${process.env.REACT_APP_TWILIO_SERVERLESS_SERVICE}/features/dialpad-queue-list/get-filtered-queues`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        }
      );

    if (response === undefined) {
      return;
    }

    return {
      ...response,
    };
  };
}

export default new TaskRouterService();
