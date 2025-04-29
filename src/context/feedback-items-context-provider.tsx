import { ReactNode, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types.ts";
import { FeedbackItemsContext } from "./feedback-items-context.tsx";
import { useFeedbackItems } from "../lib/hooks.ts";

export function FeedbackItemsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const { feedbackItems, setFeedbackItems, isLoading, errorMessage } =
    useFeedbackItems();

  // region Filter Filtered Feedback Items
  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((w) => w.company === selectedCompany)
        : feedbackItems,
    [selectedCompany, feedbackItems],
  );
  // endregion

  const handleAddFeedback = async (text: string) => {
    const companyName: string = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .slice(1);
    const feedbackItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0,
    };
    setFeedbackItems([...feedbackItems, feedbackItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(feedbackItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
  };

  const hashtags = useMemo(
    () =>
      feedbackItems
        .map((feedbackItem: TFeedbackItem) => {
          return feedbackItem.company;
        })
        .filter((w, index, array) => array.indexOf(w) === index),
    [feedbackItems],
  );

  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        errorMessage,
        setSelectedCompany,
        handleAddFeedback,
        hashtags,
        filteredFeedbackItems,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
