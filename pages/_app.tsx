import { WebWalletConnector } from "@argent/starknet-react-webwallet-connector";
import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const connectors = [
    new InjectedConnector({ options: { id: "argentX" } }),
    new InjectedConnector({ options: { id: "braavos" } }),
    new WebWalletConnector({
      url: "https://web.hydrogen.argent47.net",
    }),
  ];

  return (
    <StarknetConfig autoConnect connectors={connectors}>
      <Component {...pageProps} />
    </StarknetConfig>
  );
}
