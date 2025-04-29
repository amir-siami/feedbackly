import Container from "./components/layout/container.tsx";
import Footer from "./components/layout/footer.tsx";
import { useFeedbackItemsStore } from "./store/feedback-items-store.ts";
import { useEffect } from "react";
import HashtagList from "./components/hashtag/hashtag-list.tsx";

function App() {
  const feedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems,
  );

  useEffect(() => {
    feedbackItems();
  }, [feedbackItems]);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}
export default App;
