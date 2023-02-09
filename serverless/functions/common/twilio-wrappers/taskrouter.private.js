const { isObject, isNumber } = require("lodash");

const retryHandler = require(Runtime.getFunctions()[
  "common/twilio-wrappers/retry-handler"
].path).retryHandler;

/**
 * @param {object} parameters the parameters for the function
 * @param {number} parameters.attempts the number of retry attempts performed
 * @param {object} parameters.context the context from calling lambda function
 * @returns {object} An object containing an array of queues for the account
 * @description the following method is used to robustly retrieve
 *   the queues for the account
 */
exports.getQueues = async function getQueues(parameters) {
  const { context, attempts, workspaceSid, workerSid } = parameters;

  if (!isNumber(attempts))
    throw "Invalid parameters object passed. Parameters must contain the number of attempts";
  if (!isObject(context))
    throw "Invalid parameters object passed. Parameters must contain context object";

  try {
    const client = context.getTwilioClient();
    const queues = await client.taskrouter.v1
      .workspaces(workspaceSid)
      .taskQueues.list({ workerSid });

    return {
      success: true,
      status: 200,
      queues,
    };
  } catch (error) {
    return retryHandler(error, parameters, arguments.callee);
  }
};
