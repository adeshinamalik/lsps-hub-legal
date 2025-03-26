
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatarUrl?: string;
}

interface CommentSectionProps {
  itemId: string;
  itemType: 'publication' | 'news' | 'event';
  className?: string;
}

const CommentSection = ({ itemId, itemType, className }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Jane Cooper",
      content: "This was a particularly insightful article. I especially appreciated the discussion on the implications for future case law.",
      timestamp: new Date(Date.now() - 3600000 * 24 * 2),
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "2",
      author: "Alex Johnson",
      content: "I found the perspectives offered here to be quite valuable. Looking forward to more discussions on this topic.",
      timestamp: new Date(Date.now() - 3600000 * 24 * 5),
      avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    }
  ]);

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      toast.error("Please enter a comment before submitting");
      return;
    }

    // In a real application, this would be an API call to save the comment
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: "You", // In a real app, this would be the logged-in user
      content: commentText,
      timestamp: new Date(),
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    toast.success("Comment added successfully");
  };

  return (
    <section className={cn("py-8 border-t border-gray-200", className)}>
      <h3 className="text-2xl font-bold text-law-DEFAULT mb-6 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Comments ({comments.length})
      </h3>

      <div className="mb-8">
        <Textarea
          placeholder="Share your thoughts..."
          className="mb-3 min-h-[100px]"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          onClick={handleSubmitComment}
          className="hover:bg-law-light"
        >
          Post Comment
        </Button>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-fade-up">
            <Avatar className="h-10 w-10">
              {comment.avatarUrl && <AvatarImage src={comment.avatarUrl} alt={comment.author} />}
              <AvatarFallback className="bg-law-muted text-law-DEFAULT">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h4 className="font-semibold text-law-DEFAULT">{comment.author}</h4>
                <span className="text-sm text-law-text-light">
                  {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                </span>
              </div>
              <p className="text-law-text-light">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
