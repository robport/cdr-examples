import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import * as bitcoinMessage from 'bitcoinjs-message';
import { getNetwork } from './bip32-utils';
import { format } from 'date-fns'

export function generateSignature() {
  const seedPhrase = 'ecology potato outdoor effort manage pudding stand goose access library tongue link';
  const seed = bip39.mnemonicToSeedSync(seedPhrase);
  const network = getNetwork('testnet', 'p2wpkh');
  const root = BIP32Factory(ecc).fromSeed(seed, network);
  const path = 'm/84\'/1\'/0\'/1/1';
  const child = root.derivePath(path);
  const { address } = bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network });
  const today = format(new Date, 'dd MMM yyyy');
  const message = `I assert that, as of ${today}, the exchange owns the referenced bitcoin on behalf of the customers specified`;
  const signature = bitcoinMessage.sign(message, child.privateKey, true).toString('base64');
  return { address, message, signature };
}

console.log(generateSignature());

