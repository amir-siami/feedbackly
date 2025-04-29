import HashtagItem from "./hashtag-item.tsx";
import { useFeedbackItemsStore } from "../../store/feedback-items-store.ts";
import { useMemo } from "react";

export default function HashtagList() {
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);
  const feedbackItems = useFeedbackItemsStore((state) => state.feedbackItems);

  const hashtags = useMemo(() => {
    return Array.from(new Set(feedbackItems.map((item) => item.company)));
  }, [feedbackItems]);

  return (
    <ul className="hashtags">
      {hashtags.map((hashtag) => (
        <HashtagItem
          key={hashtag}
          company={hashtag}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}
