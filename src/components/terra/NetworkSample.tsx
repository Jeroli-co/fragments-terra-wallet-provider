import { useWallet, WalletStatus } from '@terra-money/use-wallet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {NetworkInfo} from "@terra-money/wallet-provider";

export function NetworkSample() {
  const { status, supportFeatures } = useWallet();

  return (
    <div>
      <h1>Network Sample</h1>
      {supportFeatures.has('network') ? (
        <Component />
      ) : status === WalletStatus.WALLET_CONNECTED ? (
        <p>This connection does not support Network commands</p>
      ) : (
        <p>Wallet not connected!</p>
      )}
    </div>
  );
}

const MAINNET: NetworkInfo = {
  name: 'mainnet',
  chainID: 'columbus-5',
  lcd: 'https://lcd.terra.dev',
  walletconnectID: 2
};

function Component() {
  const { hasNetwork, addNetwork } = useWallet();

  const [networkExists, setNetworkExists] = useState<
    'exists' | 'not exists' | null
  >(null);

  const availableAdd = useMemo(() => {
    return networkExists === 'not exists';
  }, [networkExists]);

  useEffect(() => {
    hasNetwork(MAINNET).then((result) =>
      setNetworkExists(result ? 'exists' : 'not exists'),
    );
  }, [hasNetwork]);

  const add = useCallback(() => {
    addNetwork(MAINNET).then((result) =>
      setNetworkExists(result ? 'exists' : 'not exists'),
    );
  }, [addNetwork]);

  return (
    <div>
      <pre>Network exists: {networkExists}</pre>
      {availableAdd && <button onClick={add}>Add network</button>}
    </div>
  );
}
