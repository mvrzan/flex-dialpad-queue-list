import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

const requestWorkerInfoHandler = async (
  workerSid: string,
  workspaceSid: string
) => {
  const body = {
    workerSid,
    workspaceSid,
    Token: manager.store.getState().flex.session.ssoTokenPayload.token,
  };

  try {
    const resp = await fetch(
      `${process.env.REACT_APP_TWILIO_SERVERLESS_SERVICE}/getQueues`,
      {
        method: 'POST',
        body: new URLSearchParams(body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default requestWorkerInfoHandler;
