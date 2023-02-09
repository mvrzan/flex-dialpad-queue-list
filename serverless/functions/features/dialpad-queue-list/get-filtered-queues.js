const { prepareFlexFunction } = require(Runtime.getFunctions()[
  "common/helpers/prepare-function"
].path);
const TaskOperations = require(Runtime.getFunctions()[
  "common/twilio-wrappers/taskrouter"
].path);

const requiredParameters = [
  {
    key: "workerSid",
    purpose: "SID for the agent initiating the outbound call",
  },
  {
    key: "workspaceSid",
    purpose: "Workspace SID to which the agent belongs to",
  },
];

exports.handler = prepareFlexFunction(
  requiredParameters,
  async (context, event, callback, response, handleError) => {
    try {
      const { workerSid, workspaceSid } = event;

      const result = await TaskOperations.getQueues({
        attempts: 0,
        context,
        workerSid,
        workspaceSid,
      });

      response.setStatusCode(result.status);
      response.setBody(result);
      return callback(null, response);
    } catch (error) {
      handleError(error);
    }
  }
);
