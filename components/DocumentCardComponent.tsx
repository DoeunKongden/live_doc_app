"use client";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, FileText } from "lucide-react";
import Link from "next/link";

interface DocumentCardProps {
  id?: string;
  title?: string;
  createdAt?: string;
}

export default function DocumentCardComponent({
  id = "doc-123",
  title = "Default Prop",
  createdAt = "2024-01-15T10:30:00Z",
}: DocumentCardProps) {
  const onDelete = () => {
    console.log("Delete button clicked");
  };
  return (
    <Link href={"/documents/" + id}>
      <Card className="bg-gray-800/50 my-5 border-gray-700 hover:bg-gray-800/70 hover:shadow-lg hover:cursor-pointer transition-all duration-200 backdrop-blur-sm rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg text-gray-100 truncate">
                {title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-gray-400 hover:text-red-400 hover:cursor-pointer hover:bg-red-500/10 flex-shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-400">
            Created {formatDate(createdAt)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
