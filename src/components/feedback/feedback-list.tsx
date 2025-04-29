import FeedbackItem from "./feedback-item.tsx";
import { ErrorDisplay } from "../error-display.tsx";
import { TFeedbackItem } from "../../lib/types.ts";
import { useFeedbackItemsStore } from "../../store/feedback-items-store.ts";
import { useEffect, useMemo } from "react";

export default function FeedbackList() {
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);
  const selectedCompany = useFeedbackItemsStore(
    (state) => state.selectedCompany,
  );
  const fetchFeedbacks = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems,
  );
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);

  useEffect(() => {
    if (feedbackItems.length === 0 && !isLoading) {
      fetchFeedbacks();
    }
  }, [feedbackItems.length, isLoading, fetchFeedbacks]);

  // Memoize the filtered list
  const filteredFeedbackItems = useMemo(() => {
    return selectedCompany
      ? feedbackItems.filter((item) => item.company === selectedCompany)
      : feedbackItems;
  }, [feedbackItems, selectedCompany]);

  return (
    <ol className="feedback-list">
      {isLoading && <div className="spinner"></div>}
      {errorMessage && <ErrorDisplay error={errorMessage} />}
      {filteredFeedbackItems.map((feedbackItem: TFeedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
