import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { error } from 'console';
import { send } from 'process';
require('dotenv').config()

//const ses = new SESClient({});
const ses = new SESClient({ region: 'us-east-2' }); 

function createSendEmailCommand(
  toAddress: string,
  fromAddress: string,
  message: string
) {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Source: fromAddress,
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your one-time password',
      },
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
    },
  });
}

export async function sendEmailToken(email: string, token: string) {
  console.log('email: ', email, token);

  const message = `Your one time password: ${token}`;
  const command = createSendEmailCommand(
    email,
    'rahul.rocket711@gmail.com',
    message
  );

  try {
    return await ses.send(command);
  } catch (e) {
    console.log('Error sending email', e);
    return error;
  }
}

//sendEmailToken("ragupta@ctemc.org","test")