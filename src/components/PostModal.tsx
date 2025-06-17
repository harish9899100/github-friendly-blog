
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Calendar, User, X } from "lucide-react";
import { CommentSection } from "./CommentSection";

interface PostModalProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    likes: number;
    comments: number;
    tags: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  onLike: (postId: number) => void;
}

export const PostModal = ({ post, isOpen, onClose, onLike }: PostModalProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <User size={14} />
              <span>{post.author}</span>
              <Calendar size={14} />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-left">{post.title}</DialogTitle>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        
        <div className="py-6">
          <div className="prose max-w-none mb-8">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-900">{paragraph.slice(3)}</h2>;
              }
              if (paragraph.startsWith('```')) {
                return null; // Skip code block markers for simplicity
              }
              if (paragraph.trim() === '') {
                return <br key={index} />;
              }
              return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>;
            })}
          </div>
          
          <div className="flex items-center space-x-4 pb-6 border-b">
            <Button
              variant="ghost"
              onClick={handleLike}
              className={`transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
              <span className="ml-2">{post.likes}</span>
            </Button>
            
            <Button variant="ghost" className="text-gray-500">
              <MessageCircle size={18} />
              <span className="ml-2">{post.comments}</span>
            </Button>
          </div>
          
          <CommentSection postId={post.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
