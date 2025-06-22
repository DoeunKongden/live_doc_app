"use client";

import Image from "next/image";
import { useState } from "react";
import LiveDocLogo from "@/public/Logo.svg";
import { Forward } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Edit3 } from "lucide-react";
import { Input } from "./ui/input";
import { Check, X } from "lucide-react";
import Link from "next/link";
interface DocumentNavbarProps {
  documenttitle?: string;
  userProfile?: {
    username: string;
    profile_url: string;
  };
}

export default function DocumentNavBarComponent({
  documenttitle = "Default Document Title",
  userProfile,
}: DocumentNavbarProps) {
  const [isEditing, setIsEditing] = useState(false);
  console.log("Editing state", isEditing);
  const [editTitle, setEditTitle] = useState(documenttitle);

  const handleSaveTitleChange = () => {
    console.log("Save Title Changes");
    setEditTitle("Edited");
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(documenttitle);
    setIsEditing(false);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveTitleChange();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="w-screen h-[100px] flex justify-between items-center self-center px-24">
      <div>
        <Link href="/documents" className="hover:opacity-80 transition-opacity cursor-pointer">
          <Image src={LiveDocLogo} alt="logo of live doc" />
        </Link>
      </div>
  
      <div className="flex h-fit items-center justify-end gap-x-9">
        <Button
          className="text-white 
        items-center
        rounded-2xl 
        flex align-middle
        hover:cursor-pointer 
        hover:bg-blue-400 
        bg-blue-500 
        w-[120px]"
        >
          <Forward color="white" />
          Share
        </Button>
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
