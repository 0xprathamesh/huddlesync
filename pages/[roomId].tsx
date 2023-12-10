import Header from "@/components/Header";
import { CiVideoOff } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";
import Subtitle from "@/components/Subtitle";
import {
  useLocalVideo,
  useLocalAudio,
  useRemoteAudio,
  usePeerIds,
  useRoom,
  useLobby,
} from "@huddle01/react/hooks";
import React, { use, useEffect, useRef, useState } from "react";
import { Avatar } from "connectkit";
import Router, { useRouter } from "next/router";
import { useAccount } from "wagmi";


function Room() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const { address } = useAccount();
  const { stream, isVideoOn, enableVideo, disableVideo } = useLocalVideo();
  const { isAudioOn, enableAudio, disableAudio } = useLocalAudio();
  const {leaveRoom} = useRoom({})
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const router = useRouter();


  const toggleVideo = async () => {
    if (isVideoEnabled) {
      await disableVideo();
    } else {
      await enableVideo();
    }
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleMic = async () => {
    if (isAudioOn) {
      await disableAudio();
    } else {
      await enableAudio();
    }
  };

  useEffect(() => {
    if (vidRef.current) {
      console.log({ vidRef, stream });
      vidRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative overflow-hidden pb-[40px] min-h-screen">
      <Header />
      <p className="font-light text-lg text-center m-5 text-gray-50">
        Meeting: {"HuddleSync AI"}
      </p>
      <div className="w-[45%] border border-white/30 bg-white/10 p-2 rounded-xl flex justify-between mx-auto mt-10 h-96 ml-10 gap-20">
        {isVideoOn ? (
          <video
            className={`object-cover w-full h-full rounded-xl`}
            ref={vidRef}
            autoPlay
            muted
            style={{ transform: "scaleX(-1)" }}
            playsInline
          />
        ) : (
          <div className="h-[130px] w-[130px] rounded-full bg-white/10 p-2 mt-28 mx-auto">
            <div className="w-full h-full rounded-full flex flex-col shadow-2xl items-center justify-center ">
              <Avatar size={115} address={address} />
            </div>
            <p className="text-center mt-5">Guest</p>
          </div>
        )}
      </div>
      <div className="w-1/2"></div>

      <div className="flex items-center justify-between mx-auto mt-2 space-y-2 ml-10 mr-10">
        <div className="flex items-center justify-center p-2 bg-white-50 rounded-md border border-white/30 w-52">
          Room ID : agu-ndxj-pex
        </div>
        <div className="flex items-center justify-center p-2 bg-white-50 rounded-md border w-52 space-x-4 border-white/50 mb-1 ">
          <button onClick={toggleVideo}>
            {isVideoEnabled ? (
              <CiVideoOn size={25} />
            ) : (
              <CiVideoOff size={25} />
            )}
          </button>
          <button onClick={toggleMic}>
            {isAudioOn ? (
              <CiMicrophoneOn size={25} />
            ) : (
              <CiMicrophoneOff size={25} />
            )}
          </button>
          <button>
            
          </button>
          <Subtitle />
          
        </div>
      </div>
    </div>
  );
}

export default Room;
