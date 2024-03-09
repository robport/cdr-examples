import { createSign, randomBytes } from 'crypto';
import axios, { AxiosError } from 'axios';
import fs from 'fs';
import { generateSignature } from './generate-signature';
import { getLastBlockHash } from './get-last-block-hash';

async function submitFunding() {
  const messageStr = JSON.stringify({
    timestamp: new Date().toISOString(),
    randomText: randomBytes(16).toString('hex'),
    email: 'rob@excal.tv'
  });

  const privateKey = fs.readFileSync('private_key.pem', 'utf8').toString();

  const authSignature = createSign('SHA256')
    .update(messageStr)
    .end()
    .sign(privateKey, 'hex');

  const latestBlockHash = await getLastBlockHash(true);

  const { address, signature, message } = generateSignature(latestBlockHash);

  try {
    const result = await axios.request({
      url: 'http://localhost:3101/api/funding-submission',
      method: 'post',
      headers: {
        'x-auth-nonce': messageStr,
        'x-auth-signature': authSignature
      },
      data: {
        addresses: [{ message, address, signature }],
      }
    });
    console.log('Result: ', result.data);
  } catch (err) {
    if (err instanceof AxiosError && !!err.response) {
      console.error('Error: ' + err.response?.data.message);
    } else {
      console.log(err.message);
    }
  }
}

submitFunding().then();
