/*
 For context see;
  https://electrum.readthedocs.io/en/latest/xpub_version_bytes.html
  https://github.com/satoshilabs/slips/blob/master/slip-0132.md
 */

export type Network =  'testnet' | 'mainnet'
export type ScriptType = 'p2wpkh';

export interface NetworkVersion {
  private: boolean;
  version: number
  network: Network;
  path: string;
  scriptType: ScriptType
}

export interface BIP32NetworkDescription {
  messagePrefix: string;
  bech32: string;
  bip32: {
    public: number;
    private: number;
  },
  pubKeyHash: number,
  scriptHash: number,
  wif: number,
}

const testnet: BIP32NetworkDescription = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'tb',
  pubKeyHash: 0x6f,
  scriptHash: 0xc4,
  wif: 0xef,
  bip32: {
    private: undefined,
    public: undefined
  }
};

const mainnet: BIP32NetworkDescription = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bc',
  pubKeyHash: 0x00,
  scriptHash: 0x05,
  wif: 0x80,
  bip32: {
    private: undefined,
    public: undefined
  }
};

export type ExtendedPublicKeyPrefix = 'zpub' | 'vpub';
export type ExtendedPrivateKeyPrefix = 'zprv' | 'vprv';
export type ExtendedKeyPrefix = ExtendedPublicKeyPrefix | ExtendedPrivateKeyPrefix

const networkData: Record<ExtendedKeyPrefix, NetworkVersion> = {
  'zpub': {
    private: false,
    version: 0x04b24746,
    network: 'mainnet',
    path: 'm/84\'/0\'/0\'',
    scriptType: 'p2wpkh'
  },
  'zprv': {
    private: true,
    version: 0x04b2430c,
    network: 'mainnet',
    path: 'm/84\'/0\'/0\'',
    scriptType: 'p2wpkh'
  },
  'vpub': {
    private: false,
    version: 0x045f1cf6,
    network: 'testnet',
    path: 'm/84\'/1\'/0\'',
    scriptType: 'p2wpkh'
  },
  'vprv': {
    private: true,
    version: 0x045f18bc,
    network: 'testnet',
    path: 'm/84\'/1\'/0\'',
    scriptType: 'p2wpkh'
  }
};


function getNetworkData(network: Network, scriptType: ScriptType) {
  return Object.values(networkData).find(v => v.network === network && v.scriptType === scriptType && v.private === true);
}

export function getDerivationPath(network: Network, scriptType: ScriptType): string {
  return getNetworkData(network, scriptType)?.path ?? undefined
}

export const getNetwork = (
  network: Network, scriptType: ScriptType
): BIP32NetworkDescription | null => {
  const version = getNetworkData(network, scriptType);
  if (!version) {
    throw new Error('Unknown key version');
  }

  const bip32 = version.private ? {
    private: version.version,
    public: 0
  } : {
    private: 0,
    public: version.version
  }

  return {
    ...version.network === 'mainnet' ? mainnet : testnet,
    bip32: bip32
  };
};

