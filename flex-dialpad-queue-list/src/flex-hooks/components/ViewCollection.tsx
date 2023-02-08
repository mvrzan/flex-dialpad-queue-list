import * as Flex from '@twilio/flex-ui';

import QueueList from './../../custom-components/QueueList/QueueList';
import Label from './../../custom-components/Label/Label';

export default (flex: typeof Flex, manager: Flex.Manager) => {
  // Remove "Assign to anyone" label
  flex.OutboundDialerPanel.Content.remove('queue-select-caption');

  // Remove the OOB Queue List dropdown
  flex.OutboundDialerPanel.Content.remove('queue-select');

  // add a custom Label component
  flex.OutboundDialerPanel.Content.add(<Label key="label" />, {
    sortOrder: 1,
    align: 'start',
  });

  // add a custom component Queue List component
  flex.OutboundDialerPanel.Content.add(<QueueList key="queue-list" />, {
    sortOrder: 1,
  });
};
