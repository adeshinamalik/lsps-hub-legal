
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/Firebase";
import { Input } from "@/components/ui/input";

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const commentsRef = collection(db, "comments");
        const q = query(
          commentsRef,
          where("itemId", "==", itemId),
          where("itemType", "==", itemType),
          orderBy("timestamp", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedComments = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            author: data.author,
            content: data.content,
            timestamp: data.timestamp?.toDate() || new Date(),
            avatarUrl: data.avatarUrl
          };
        });
        
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [itemId, itemType]);

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      toast.error("Please enter a comment before submitting");
      return;
    }

    if (!authorName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    try {
      // Add comment to Firestore
      const commentRef = await addDoc(collection(db, "comments"), {
        itemId,
        itemType,
        author: authorName,
        content: commentText,
        timestamp: serverTimestamp()
      });

      // Create a new comment object for the UI
      const newComment: Comment = {
        id: commentRef.id,
        author: authorName,
        content: commentText,
        timestamp: new Date()
      };

      setComments([newComment, ...comments]);
      setCommentText("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <section className={cn("py-8 border-t border-gray-200", className)}>
      <h3 className="text-2xl font-bold text-law-DEFAULT mb-6 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Comments ({comments.length})
      </h3>

      <div className="mb-8 space-y-4">
        <Input
          placeholder="Your Name"
          className="mb-3"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <Textarea
          placeholder="Share your thoughts..."
          className="mb-3 min-h-[100px]"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button 
          onClick={handleSubmitComment} 
          className="bg-law-DEFAULT hover:bg-law-light"
        >
          Post Comment
        </Button>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
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
          ))
        ) : (
          <div className="text-center py-8 text-law-text-light">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
