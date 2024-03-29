import axios, { AxiosError } from 'axios';
import { getAuthHeaders } from './get-auth-headers';
import { CDR_API_URL } from './config';

async function authenticate() {

  const authHeaders = getAuthHeaders();

  try {
    const result = await axios.request({
      url: `${CDR_API_URL}/api/system`,
      method: 'get',
      headers: authHeaders
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

authenticate().then();
