import { Manager } from '@twilio/flex-ui';
import { WorkerInfoType } from '../types/types';

const WorkerInfo = (): WorkerInfoType => {
  const { workerSid, workspaceSid } = Manager.getInstance().workerClient!;

  return { workerSid, workspaceSid };
};

export default WorkerInfo;
