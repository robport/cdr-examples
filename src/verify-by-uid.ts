import axios, { AxiosError } from 'axios';
import { CDR_API_URL } from './config';

async function verifyByUid() {
  try {
    const result = await axios.request({
      url: `${CDR_API_URL}/api/verification/verify-by-uid`,
      method: 'post',
      data: {
        uid: 'b3d9f994-c45c-4dd1-a280-e90f403b85f8'
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
