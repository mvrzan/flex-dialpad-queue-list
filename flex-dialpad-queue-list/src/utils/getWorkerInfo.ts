import { Manager } from '@twilio/flex-ui';
import { WorkerInfoType } from '../types/queue-list/types';

const getWorkerInfo = (): WorkerInfoType => {
  const { workerSid, workspaceSid } = Manager.getInstance().workerClient!;

  return { workerSid, workspaceSid };
};

export default getWorkerInfo;
