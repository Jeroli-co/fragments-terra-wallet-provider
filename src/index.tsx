import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Loader } from "./components/Loader";
import { WalletConnector } from "./components/WalletConnector";

function App() {
  const [connectorProps, setConnectorProps] = useState<{
    callbackURL: string;
    token: string;
  } | null>(null);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("token");
    const callbackURL = queryParameters.get("callback_url");

    if (!token || !callbackURL) {
      window.location.href = "https://fragments-p2e.com";
    } else {
      setConnectorProps({ callbackURL, token });
    }
  }, []);

  return (
    <main>
      {!connectorProps ? <Loader /> : <WalletConnector {...connectorProps} />}
    </main>
  );
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById("root")
  );
});
