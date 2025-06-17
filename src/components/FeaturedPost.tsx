
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Calendar, User } from "lucide-react";
import { PostModal } from "./PostModal";

interface FeaturedPostProps {
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

export const FeaturedPost = ({ post, onLike }: FeaturedPostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="md:flex">
          {post.image && (
            <div className="md:w-1/2">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          
          <div className={`${post.image ? 'md:w-1/2' : 'w-full'} p-6`}>
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                <Badge variant="default" className="bg-blue-600">Featured</Badge>
                <User size={14} />
                <span>{post.author}</span>
                <Calendar size={14} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              
              <h2 
                className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                {post.title}
              </h2>
            </CardHeader>
            
            <CardContent className="p-0">
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
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
                
                <Button onClick={() => setIsModalOpen(true)}>
                  Read Full Article
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
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
