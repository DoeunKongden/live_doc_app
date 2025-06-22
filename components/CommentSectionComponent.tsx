"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";
import { 
  MessageCircle, 
  Send, 
  Smile, 
  MoreVertical, 
  Reply, 
  Heart,
  Trash2,
  Edit3,
  Clock
} from "lucide-react";
import toast from "react-hot-toast";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
    color: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
  isEditing?: boolean;
}

interface CommentSectionProps {
  documentId?: string;
}

export default function CommentSectionComponent({ documentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: {
        name: "John Doe",
        initials: "JD",
        color: "bg-blue-500"
      },
      content: "This section needs more detail about the implementation. Could we add some examples?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      likes: 3,
      isLiked: false,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Sarah Wilson",
            initials: "SW",
            color: "bg-purple-500"
          },
          content: "I agree! Some code examples would be really helpful here.",
          timestamp: new Date(Date.now() - 1 * 60 * 1000),
          likes: 1,
          isLiked: true,
        }
      ]
    },
    {
      id: "2",
      author: {
        name: "Jane Smith",
        initials: "JS",
        color: "bg-green-500"
      },
      content: "Great work on the formatting! The headings look perfect. This is exactly what we needed for the documentation.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      likes: 2,
      isLiked: true,
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const generateRandomUser = () => {
    const names = ["Alex Chen", "Maria Garcia", "David Kim", "Emma Brown", "Ryan Taylor"];
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500"];
    
    const name = names[Math.floor(Math.random() * names.length)];
    const initials = name.split(" ").map(n => n[0]).join("");
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return { name, initials, color };
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPosting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = generateRandomUser();
      const comment: Comment = {
        id: `comment_${Date.now()}`,
        author: user,
        content: newComment.trim(),
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment("");
      toast.success("Comment posted successfully!");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setIsPosting(false);
    }
  };

  const handlePostReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const user = generateRandomUser();
      const reply: Comment = {
        id: `reply_${Date.now()}`,
        author: user,
        content: replyContent.trim(),
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
      };
      
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      }));
      
      setReplyContent("");
      setReplyingTo(null);
      toast.success("Reply posted!");
      
    } catch (error) {
      toast.error("Failed to post reply");
    }
  };

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      }));
    }
  };

  const handleDeleteComment = (commentId: string, isReply = false, parentId?: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      if (isReply && parentId) {
        setComments(prev => prev.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies?.filter(reply => reply.id !== commentId)
            };
          }
          return comment;
        }));
      } else {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
      toast.success("Comment deleted");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      callback();
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setNewComment(textarea.value);
    
    // Reset height to auto to get correct scrollHeight
    textarea.style.height = "auto";
    // Set height to scrollHeight (content height)
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { 
    comment: Comment; 
    isReply?: boolean; 
    parentId?: string;
  }) => (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
      <div className="flex space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <div className={`w-full h-full ${comment.author.color} flex items-center justify-center text-white text-sm font-medium`}>
            {comment.author.initials}
          </div>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-white">
                {comment.author.name}
              </span>
              <span className="text-xs text-white/60 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatTimeAgo(comment.timestamp)}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteComment(comment.id, isReply, parentId)}
                className="text-white/60 hover:text-red-400 hover:bg-red-500/20 p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <p className="text-sm text-white/90 mb-3 leading-relaxed break-words">
            {comment.content}
          </p>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
              className={`text-xs p-1 h-auto transition-colors ${
                comment.isLiked 
                  ? "text-red-400 hover:text-red-300" 
                  : "text-white/60 hover:text-red-400"
              }`}
            >
              <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
              {comment.likes > 0 && comment.likes}
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-xs text-white/60 hover:text-blue-400 p-1 h-auto"
              >
                <Reply className="w-3 h-3 mr-1" />
                Reply
              </Button>
            )}
          </div>
          
          {/* Reply Input */}
          {replyingTo === comment.id && (
            <div className="mt-3 space-y-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, () => handlePostReply(comment.id))}
                placeholder="Write a reply..."
                className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400"
                rows={2}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent("");
                  }}
                  className="text-white/60 hover:text-white text-xs"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handlePostReply(comment.id)}
                  disabled={!replyContent.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          )}
          
          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-3 border-l border-white/20 pl-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="group">
                  <CommentItem comment={reply} isReply={true} parentId={comment.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">
            Comments ({comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)})
          </h3>
        </div>
      </div>

      {/* Comment Input */}
      <div className="p-4 border-b border-white/10">
        <div className="space-y-3">
          <div className="flex space-x-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                YU
              </div>
            </Avatar>
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={newComment}
                onChange={handleTextareaChange}
                onKeyPress={(e) => handleKeyPress(e, handlePostComment)}
                placeholder="Add a comment..."
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
                rows={2}
                style={{ minHeight: "56px" }}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/60 flex items-center">
              <Smile className="w-3 h-3 mr-1" />
              Shift + Enter for new line
            </span>
            <Button
              onClick={handlePostComment}
              disabled={!newComment.trim() || isPosting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
            >
              {isPosting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="group">
              <CommentItem comment={comment} />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60 mb-2">No comments yet</p>
            <p className="text-white/40 text-sm">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
