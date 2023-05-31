import { ChangeEvent, useEffect, useState } from 'react';
import { Stack, Flex, HelpText } from '@twilio-paste/core';
import { Select } from '@twilio-paste/core/select';
import { Option } from '@twilio-paste/core/select';
import { Spinner } from '@twilio-paste/core/spinner';
import { Actions } from '@twilio/flex-ui';

import { noQueuesFound, selectQueue } from './constants';
import { QueueInfo, myPayload } from '../../types/queue-list/types';
import TaskRouterService from '../../utils/TaskRouter/TaskRouterService';

const QueueList = () => {
  const [queueSid, setQueueSid] = useState('');
  const [isLoadingQueues, setIsLoadingQueues] = useState(true);
  const [queueList, setQueueList] = useState<QueueInfo[]>([]);

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setQueueSid(event.target.value);
  };

  const getWorkerInfo = async (): Promise<void> => {
    const responseQueues = await TaskRouterService.getQueueInfo();

    setQueueList(responseQueues);
    setIsLoadingQueues(false);
  };

  useEffect(() => {
    getWorkerInfo();
  }, []);

  useEffect(() => {
    if (queueList.length !== 0) {
      setIsLoadingQueues(false);
    }
  }, [queueList]);

  useEffect(() => {
    const payloadHandler = (payload: myPayload): void => {
      payload.queueSid = queueSid;
    };
    Actions.addListener('beforeStartOutboundCall', payloadHandler);

    return () => {
      Actions.removeListener('beforeStartOutboundCall', payloadHandler);
    };
  }, [queueSid]);

  return (
    <>
      {/* Loading state that displays a spinner */}
      {isLoadingQueues ? (
        <>
          <Stack orientation="vertical" spacing="space40">
            <Flex hAlignContent="center" width="100%">
              <Spinner decorative={false} title="Loading" size="sizeIcon70" />
            </Flex>
            <HelpText>Loading filtered queues</HelpText>
          </Stack>
        </>
      ) : (
        <>
          {/* List of filtered queues */}
          {queueList.length !== 0 ? (
            <>
              <Flex width="100%" vertical hAlignContent="center">
                <Select id="queue" onChange={onChangeHandler}>
                  {queueList.map(option => (
                    <Option key={option.sid} value={option.sid}>
                      {option.friendlyName}
                    </Option>
                  ))}
                </Select>
                <HelpText>{selectQueue}</HelpText>
              </Flex>
            </>
          ) : (
            <>
              {/* Help text in cases there are no available queues */}
              <HelpText>{noQueuesFound}</HelpText>
            </>
          )}
        </>
      )}
    </>
  );
};

export default QueueList;
