"use client";
import Image from "next/image";
import LiveDocLogo from "@/public/Logo.svg";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AuthenticatedNavBarComponent() {
  return (
    <div className="w-screen h-[100px] flex justify-between items-center px-24">
      <div>
        <Image src={LiveDocLogo} alt="logo of live doc" />
      </div>
      <div className="flex h-fit items-center justify-end gap-x-9">
        <Search color="white" />
        <Bell color="white" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default AuthenticatedNavBarComponent;
