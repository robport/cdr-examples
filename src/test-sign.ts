import { generateSignature } from './generate-signature';

const blockHash = '000000000000000fe8a6c111b93ef52d5b8153416064e01ed196744a2dd848f2'
const signature = generateSignature(blockHash);
console.log(signature);
const expectedSignature = 'H4zfPBe3UBzqneLRKmh1DSzMU5xtHeI9rWxUsEDRgo+JONBarHcRPNkCAhd4D+0S4dyav+C62tMOCs9jXKf19JU=';
const success = signature.signature ===  expectedSignature
console.log(`Test Result: ${success ? 'Pass' : 'Fail'}`);


