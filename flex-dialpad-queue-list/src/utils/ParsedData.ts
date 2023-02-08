import WorkerInfo from './WorkerInfo';
import requestWorkerInfoHandler from './RequestWorkerInfo';
import { QueueInfo } from 'types/types';

const parsedData = async (): Promise<QueueInfo[] | []> => {
  const { workerSid, workspaceSid } = WorkerInfo();
  const response = await requestWorkerInfoHandler(workerSid, workspaceSid);

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

export default parsedData;
