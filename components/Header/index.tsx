import React from "react";
import { ConnectKitButton } from "connectkit";
import Router from "next/router";
import useIsClient from "@/hooks/useIsClient";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  const isClient = useIsClient();

  if (!isClient) return;
  return (
    <div className=" border-b border-white/10 px-5 sm:px-0">
      <div className="container max-w-7xl mx-auto h-16 items-center flex justify-between mt-4">
        <div className="flex items-center space-x-3">
          <div
            onClick={() => Router.push("/")}
            className="font-bold text-[26px] -mt-2 text-blue-600"
          >HuddleSync AI</div>
        </div>
        <div>
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
