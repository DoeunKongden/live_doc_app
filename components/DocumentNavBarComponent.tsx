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
        <Image src={LiveDocLogo} alt="logo of live doc" />
      </div>
      <div>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-gray-700 border-gray-600 text-gray-100 focus:border-purple-500 min-w-[200px]"
              autoFocus
            />
            <Button
              onClick={handleSaveTitleChange}
              size="sm"
              variant="ghost"
              className="text-green-400 hover:text-green-300 hover:bg-green-500/10 hover:cursor-pointer"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleCancelEdit}
              size="sm"
              variant="ghost"
              className="text-red-400 hover:text-red-300 hover:cursor-pointer hover:bg-red-500/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-gray-100 font-semibold text-xl max-w-[300px] truncate">
              {documenttitle}
            </h1>
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-700 hover:rounded hover:cursor-pointer"
            >
              <Edit3 />
            </Button>
          </div>
        )}
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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
