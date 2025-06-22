"use client";
import Image from "next/image";
import LiveDocLogo from "@/public/Logo.svg";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AuthenticatedNavBarComponent() {
  return (
    <div className="w-screen h-[100px] flex justify-between items-center px-24">
      <div>
        <Link href="/documents" className="hover:opacity-80 transition-opacity cursor-pointer">
          <Image src={LiveDocLogo} alt="logo of live doc" />
        </Link>
      </div>
      <div className="flex h-fit items-center justify-end gap-x-9">
        <button className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
          <Search className="w-5 h-5" />
        </button>
        <button className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
          <Bell className="w-5 h-5" />
        </button>
        <Link href="/profile" className="hover:opacity-80 transition-opacity">
          <Avatar className="cursor-pointer">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}

export default AuthenticatedNavBarComponent;
