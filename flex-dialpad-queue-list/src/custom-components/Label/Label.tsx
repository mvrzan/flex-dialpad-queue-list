import { Label as PasteLabel } from "@twilio-paste/core/label";
import { Flex } from "@twilio-paste/core/flex";

const Label = () => {
  return (
    <Flex
      hAlignContent="left"
      marginBottom="space30"
      marginTop="space30"
      width="100%"
    >
      <PasteLabel htmlFor="queue">Available outbound queues</PasteLabel>
    </Flex>
  );
};

export default Label;
