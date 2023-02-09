import getWorkerInfo from './getWorkerInfo';
import { QueueInfo } from 'types/queue-list/types';
import TaskRouterService from './TaskRouter/TaskRouterService';

const getParsedData = async (): Promise<QueueInfo[] | []> => {
  const { workerSid, workspaceSid } = getWorkerInfo();
  const config = { workerSid, workspaceSid };
  const response = await TaskRouterService.getQueueInfo(config);

  if (response === undefined) {
    return [];
  }

  const responseQueues = Object.keys(response)
    .map(queue => response[+queue])
    .map(newQueue => {
      const { friendlyName, sid } = newQueue;
      return { friendlyName, sid };
    })
    .filter(elem => elem);

  return responseQueues;
};

export default getParsedData;
