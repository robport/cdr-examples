import { randomBytes, createSign } from 'crypto';
import fs from 'fs';
import { USER_EMAIL } from './config';

export function getAuthHeaders() {
  const messageStr = JSON.stringify({
    timestamp: new Date().toISOString(),
    randomText: randomBytes(16).toString('hex'),
    email: USER_EMAIL
  });

  const privateKey = fs.readFileSync('private_key.pem', 'utf8').toString();

  const authSignature = createSign('SHA256')
    .update(messageStr)
    .end()
    .sign(privateKey, 'hex');
  return {
    'x-auth-nonce': messageStr,
    'x-auth-signature': authSignature
  };
}
