export interface QueueInfo {
  friendlyName: string;
  sid: string;
}

export interface WorkerInfoType {
  workerSid: string;
  workspaceSid: string;
}

export interface TaskRouterResponse {
  accountSid: string;
  assignmentActivityName: string;
  assignmentActivitySid: string;
  dateCreated: string;
  dateUpdated: string;
  friendlyName: string;
  links: {
    assignment_activity: string;
    cumulative_statistics: string;
    list_statistics: string;
    real_time_statistics: string;
    reservation_activity: string;
    statistics: string;
    workspace: string;
  };
  maxReservedWorkers: number;
  reservationActivityName: string;
  reservationActivitySid: string;
  sid: string;
  targetWorkers: string;
  taskOrder: string;
  url: string;
  workspaceSid: string;
}

export interface ServerlessResponse {
  success: boolean;
  status: number;
  queues: TaskRouterResponse[];
}
