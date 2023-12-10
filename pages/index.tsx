import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { useDevices, useRoom } from "@huddle01/react/hooks";
import { Avatar } from "connectkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
import useIsClient from "@/hooks/useIsClient";
import { Divide } from "lucide";

type Props = {
  roomId: string;
  token: string;
};

export default function Home({ roomId, token }: Props) {
  console.log({ token, roomId });
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const { joinRoom, state } = useRoom({
    onJoin: (room) => {
      console.log("onJoin", room);
      router.push(`/${roomId}`);
    },
    onPeerJoin: (peer) => {
      console.log("onPeerJoin", peer);
    },
  });

  const vidRef = useRef<HTMLVideoElement>(null);

  const {
    devices,
    preferredDeviceId,
    preferredDevice,
    fetchStream,
    getPermission,
    setPreferredDevice,
  } = useDevices({
    type: "cam",
    onPermissionGranted() {},
    onPermissionDenied() {},
  });
  const [streamStarted, setStreamStarted] = useState(false);

  const onClick = async () => {
    try {
      const { stream } = await fetchStream({ mediaDeviceKind: "cam" });
      console.log({ stream });
      setStreamStarted(true);
      if (vidRef.current) {
        vidRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error fetching stream:", error);
      setStreamStarted(false);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden pb-[40px] min-h-screen">
        <Header></Header>
        <div className="w-[50%] bg-white/10 p-2 rounded-xl justify-between mx-auto mt-20 h-96 ">
          <video
            className={`${
              streamStarted ? "" : "hidden"
            } object-cover w-full h-full rounded-xl`}
            ref={vidRef}
            autoPlay
            muted
            style={{ transform: "scaleX(-1)" }}
            playsInline
          />

          <div
            className={`${
              streamStarted ? "hidden" : ""
            } w-full h-full flex items-center justify-center`}
          >
            {isConnected ? (
              <div className="flex-col">
                <div className="shadow-h-[130px] w-[130px] rounded-full bg-white/10 p-2 mt-27 mx-auto ">
                  <Avatar size={115} address={address} />
                </div>
                <p className="text-center mt-5 text-lg">Guests</p>
              </div>
            ) : (
              <div className="h-30 w-30 rounded-full bg-gray-500"> </div>
            )}
          </div>
        </div>
        <div className="flex justify-center space-x-10 mt-10">
          <button
            type="button"
            className="p-2 border border-white rounded-md px-8"
            onClick={onClick}
          >
            FetchStream
          </button>
          <button
            onClick={async () => {
              await joinRoom({ roomId: roomId, token: token });
            }}
            className="p-2 border border-white rounded-md px-8"
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}

//create access token
export const getServerSideProps = async () => {
  const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "qgoZqCLhcqDKyhAnNXKfXMvXGjmalEoy",
    },
    body: JSON.stringify({
      title: "HuddleMate AI",
      hostWallets: [],
    }),
  });

  const { data } = await response.json();

  console.log({ data });

  const accessToken = new AccessToken({
    apiKey: "zMQHa6hH5hGrxfwYZp7z8I-1lWScI7UA",
    roomId: "mom-xnkh-lwh",

    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
    options: {
      metadata: {
        // you can add any custom attributes here which you want to associate with the user
        walletAddress: "0x29f54719E88332e70550cf8737293436E9d7b10b",
      },
    },
  });

  const token = await accessToken.toJwt();

  return {
    props: { token, roomId: data.roomId },
  };
};

//click on join room button

//redirect to room page

// const [roomId, setRoomId] = useState(null);
