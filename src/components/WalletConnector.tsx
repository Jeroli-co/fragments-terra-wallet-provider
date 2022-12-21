import React from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

type WalletConnectorProps = {
  callbackURL: string;
  token: string;
};

export const WalletConnector = (props: WalletConnectorProps) => {
  const { callbackURL, token } = props;
  const {
    status,
    wallets,
    availableInstallTypes,
    availableConnections,
    connect,
    install,
  } = useWallet();

  return (
    <div className="wallet-container">
      <div className="wallet-logos">
        <img src="/logo/logo_512x512.png" alt="logo" className="wallet-logo" />
        <img
          src="/logo/logo_text_white.png"
          alt="logo"
          className="wallet-logo-text"
        />
      </div>
      <div className="wallet-box">
        {status === WalletStatus.INITIALIZING && (
          <span>A moment please...</span>
        )}

        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            <h1>Connect your Terra wallet</h1>

            <div className="wallet-buttons">
              {availableInstallTypes.map((connectType) => (
                <button
                  key={"install-" + connectType}
                  onClick={() => install(connectType)}
                  className="wallet-btn"
                >
                  Install {connectType}
                </button>
              ))}
            </div>

            <div className="wallet-buttons">
              {availableConnections.map(
                ({ type, name, icon, identifier = "" }) => (
                  <button
                    key={"connection-" + type + identifier}
                    onClick={() => connect(type, identifier)}
                    className="wallet-btn"
                  >
                    <img
                      src={icon}
                      alt={name}
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span>
                      {name} [{identifier}]
                    </span>
                  </button>
                )
              )}
            </div>
          </>
        )}

        {status === WalletStatus.WALLET_CONNECTED && (
          <div className="wallet-addr-chooser">
            <h1>Choose the address you want to link</h1>
            <div className="wallet-buttons">
              {wallets?.map((w) => (
                <a
                  href={`${callbackURL}?token=${token}&terraAddr=${w.terraAddress}`}
                  className="wallet-link"
                >
                  {w.terraAddress}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
