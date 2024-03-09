import axios, { AxiosError } from 'axios';
import { getAuthHeaders } from './get-auth-headers';
import { CDR_API_URL } from './config';

async function getFundingStatus() {
  const authHeaders = getAuthHeaders();

  try {
    const result = await axios.request({
      url: `${CDR_API_URL}/api/funding-submission/status`,
      method: 'get',
      headers: authHeaders
    });
    console.log(JSON.stringify(result.data, null, 2));
  } catch (err) {
    if (err instanceof AxiosError && !!err.response) {
      console.error('Error: ' + err.response?.data.message);
    } else {
      console.log(err.message);
    }
  }
}

getFundingStatus().then()
