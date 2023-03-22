import { useAccount, useConnectors } from "@starknet-react/core";
import { useMemo } from "react";

function WalletConnected() {
  const { address, account } = useAccount();
  const { disconnect } = useConnectors();

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div>
      <span>Connected: {shortenedAddress}</span>
      <button onClick={disconnect}>Disconnect</button>
      {/* trigger transaction to self */}
      <button
        onClick={async () => {
          console.log(
            await account?.execute({
              contractAddress:
                "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
              entrypoint: "transfer",
              calldata: [address ?? "0x0", 1],
            })
          );
        }}
      >
        Send to self
      </button>
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnectors();

  return (
    <div>
      <span>Choose a wallet:</span>
      {connectors.map((connector) => {
        return (
          <button key={connector.id()} onClick={() => connect(connector)}>
            {connector.id()}
          </button>
        );
      })}
    </div>
  );
}

export default function WalletBar() {
  const { address } = useAccount();

  return address ? <WalletConnected /> : <ConnectWallet />;
}
