import "@/styles/globals.css";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig } from "wagmi";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { polygonMumbai } from "viem/chains";
const chains = [polygonMumbai];

const config = createConfig(
  getDefaultConfig({
    alchemyId: "UpSv7mJpuoULkrekW2bz2Qt81psGXAup",
    walletConnectProjectId: "94c4c3c5b03878b278d800dd266f9590",chains,
    appName: "Huddle",
  })
);
const huddleClient = new HuddleClient({
  projectId: "r5Z7HLbOu4jXOxy_AL9GtOh2eWMfkAfr",
  options: {
    activeSpeakers: {
      size: 2,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight">
        <HuddleProvider key="huddle01-provider" client={huddleClient}>
          <Component {...pageProps} />
        </HuddleProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
//qgoZqCLhcqDKyhAnNXKfXMvXGjmalEoy
//r5Z7HLbOu4jXOxy_AL9GtOh2eWMfkAfr
