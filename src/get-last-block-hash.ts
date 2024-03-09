import axios from 'axios';

export const getLastBlockHash = async (
  testnet = false
) => {
  const url = `https://blockstream.info${testnet ? '/' + 'testnet' : ''}/api/blocks/tip/hash`;
  const res = await axios.get(url);
  return res.data;
}
