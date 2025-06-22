"use client";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, FileText, Clock, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DocumentCardProps {
  id?: string;
  title?: string;
  createdAt?: string;
  onDelete?: (id: string) => void;
}

export default function DocumentCardComponent({
  id = "doc-123",
  title = "Default Prop",
  createdAt = "2024-01-15T10:30:00Z",
  onDelete,
}: DocumentCardProps) {
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      if (onDelete && id) {
        onDelete(id);
        toast.success("Document deleted successfully");
      }
    }
  };

  const handleCardClick = () => {
    router.push(`/documents/${id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:shadow-xl hover:cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg text-white truncate group-hover:text-blue-300 transition-colors">
                {title}
              </h3>
            </div>
          </div>
          
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-white/60 hover:text-red-400 hover:bg-red-500/20 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Delete document"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Clock className="h-4 w-4" />
          <span>Created {formatDate(createdAt)}</span>
        </div>
        
        {/* Preview or additional info could go here */}
        <div className="mt-2 text-xs text-white/40">
          Click to open document
        </div>
      </CardContent>
    </Card>
  );
}
