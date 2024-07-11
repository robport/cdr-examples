import { createSign, randomBytes } from 'crypto';
import axios, { AxiosError } from 'axios';
import fs from 'fs';
import { generateSignature } from './generate-signature';
import { getLastBlockHash } from './get-last-block-hash';

async function verifyByUid() {
  try {
    const result = await axios.request({
      url: 'http://localhost:3101/api/verification/verify-by-uid',
      method: 'post',
      data: {
        uid: 'b3d9f994-c45c-4dd1-a280-e90f403b85f8',
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

verifyByUid().then();
