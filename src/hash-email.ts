import * as crypto from 'crypto';
const hash = crypto.createHash('sha256').update('rob@excal.tv').digest('hex');
console.log(hash)
