import { TFeedbackItem } from "../lib/types.ts";
import { create } from "zustand";

interface FeedbackStore {
  feedbackItems: TFeedbackItem[];
  companyList: string[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
}

export const useFeedbackItemsStore = create<FeedbackStore>((set, get) => ({
  feedbackItems: [],
  companyList: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (item) => item.company === state.selectedCompany,
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
    const companyName =
      text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.slice(1) ?? "";
    const feedbackItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0,
    };

    set((state) => ({
      feedbackItems: [...state.feedbackItems, feedbackItem],
      companyList: Array.from(
        new Set([...state.feedbackItems.map((i) => i.company), companyName]),
      ),
    }));

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
  },
  selectCompany: (company: string) => {
    set({ selectedCompany: company });
  },
  fetchFeedbackItems: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      );
      if (!response.ok) {
        throw new Error("Something happened");
      }
      const data = await response.json();
      set({
        feedbackItems: data.feedbacks,
        companyList: Array.from(
          new Set(data.feedbacks.map((item: TFeedbackItem) => item.company)),
        ),
        isLoading: false,
      });
    } catch (err) {
      set({
        errorMessage:
          err instanceof Error ? err.message : "Something went wrong",
        isLoading: false,
      });
    }
  },
}));
