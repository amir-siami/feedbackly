import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../context/feedback-items-context.tsx";
import { TFeedbackItem } from "./types.ts";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error("FeedbackList must be used within a FeedbackItem");
  }
  return context;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        );
        if (!response.ok) {
          throw new Error("Something happened");
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err : new Error("Something went wrong"),
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return { feedbackItems, isLoading, errorMessage, setFeedbackItems };
}
