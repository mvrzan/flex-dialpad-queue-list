const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const { workerSid, workspaceSid } = event;
  const client = context.getTwilioClient();

  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("access-control-request-headers: content-type");

  try {
    const queueList = await client.taskrouter.v1
      .workspaces(workspaceSid)
      .taskQueues.list({ workerSid });

    response.appendHeader("Content-Type", "application/json");
    response.setBody(queueList);
    // Return a success response using the callback function.
    return callback(null, response);
  } catch (err) {
    response.appendHeader("Content-Type", "plain/text");
    response.setBody(err.message);
    response.setStatusCode(500);
    // If there's an error, send an error response
    // Keep using the response object for CORS purposes
    console.error(err);
    return callback(null, response);
  }
});
