
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, User } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
}

interface CommentSectionProps {
  postId: number;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Alice Johnson",
    content: "Great article! This really helped me understand TypeScript better. The examples are clear and practical.",
    date: "2024-06-16",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "Bob Wilson",
        content: "I agree! The code examples were particularly helpful.",
        date: "2024-06-16",
        likes: 3,
        replies: []
      }
    ]
  },
  {
    id: 3,
    author: "Charlie Brown",
    content: "Thanks for sharing this. I've been struggling with TypeScript integration and this cleared up a lot of confusion.",
    date: "2024-06-15",
    likes: 8,
    replies: []
  }
];

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "You",
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleSubmitReply = (parentId: number) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: Date.now(),
        author: "You",
        content: replyContent,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: []
      };
      
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      setReplyContent("");
      setReplyTo(null);
    }
  };

  const handleLikeComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { comment: Comment; isReply?: boolean; parentId?: number }) => (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="flex space-x-3 mb-4">
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            <User size={16} />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm text-gray-900">{comment.author}</span>
            <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
          </div>
          
          <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
              className="text-gray-500 h-6 px-2"
            >
              <Heart size={12} />
              <span className="ml-1 text-xs">{comment.likes}</span>
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-gray-500 h-6 px-2"
              >
                <MessageCircle size={12} />
                <span className="ml-1 text-xs">Reply</span>
              </Button>
            )}
          </div>
          
          {replyTo === comment.id && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                  Reply
                </Button>
                <Button variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
      ))}
    </div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
      
      <div className="mb-6">
        <Textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </div>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      
      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};
