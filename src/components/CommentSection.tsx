import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { User, MessageSquare, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, auth } from "@/firebase/Firebase";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatarUrl?: string;
  userId?: string;
}

interface CommentSectionProps {
  itemId: string;
  itemType: "publication" | "news" | "event" | "resource";
  className?: string;
}

const CommentSection = ({ itemId, itemType, className }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission

  console.log("Item ID:", itemId);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const commentsRef = collection(db, "comments");
      const q = query(
        commentsRef,
        where("itemId", "==", itemId),
        where("itemType", "==", itemType),
        orderBy("timestamp", "asc")
      );

      const querySnapshot = await getDocs(q);
      console.log("Fetching comments");

      const fetchedComments = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          author: data.author,
          content: data.content,
          timestamp: data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(),
          avatarUrl: data.avatarUrl,
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

  useEffect(() => {
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

    setIsSubmitting(true); // Disable button
    try {
      await addDoc(collection(db, "comments"), {
        itemId,
        itemType,
        author: authorName,
        content: commentText,
        timestamp: serverTimestamp(),
      });

      console.log("Comment posted:", commentText);
      setCommentText(""); // Reset after success
      toast.success("Comment added successfully");
      await fetchComments(); // Refetch comments
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false); // Re-enable button
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
          disabled={isLoading || isSubmitting} // Disable during loading or submitting
        />
        <Textarea
          placeholder="Share your thoughts..."
          className="mb-3 min-h-[100px]"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isLoading || isSubmitting} // Disable during loading or submitting
        />
        <Button
          onClick={handleSubmitComment}
          className="hover:bg-law-light"
          disabled={isLoading || isSubmitting} // Disable during loading or submitting
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
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