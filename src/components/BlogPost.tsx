
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Calendar, User } from "lucide-react";
import { PostModal } from "./PostModal";

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    likes: number;
    comments: number;
    tags: string[];
    image?: string;
  };
  onLike: (postId: number) => void;
}

export const BlogPost = ({ post, onLike }: BlogPostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  return (
    <>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <User size={14} />
            <span>{post.author}</span>
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <h3 
            className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2"
            onClick={() => setIsModalOpen(true)}
          >
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pb-4">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
          
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                <span className="ml-1">{post.likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MessageCircle size={16} />
                <span className="ml-1">{post.comments}</span>
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Read More
            </Button>
          </div>
        </CardFooter>
      </Card>

      <PostModal 
        post={post} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLike={onLike}
      />
    </>
  );
};
