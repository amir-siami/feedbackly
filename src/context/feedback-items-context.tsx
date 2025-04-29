import { createContext } from "react";
import { TFeedbackItem } from "../lib/types.ts";

type TFeedbackItemsContext = {
  isLoading: boolean;
  errorMessage: string | Error | null;
  setSelectedCompany: (selectedCompany: string) => void;
  handleAddFeedback: (text: string) => void;
  hashtags: Array<string>;
  filteredFeedbackItems: TFeedbackItem[];
};
export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null,
);
