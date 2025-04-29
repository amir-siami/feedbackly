import Header from "./header.tsx";
import FeedbackList from "../feedback/feedback-list.tsx";

export default function Container() {
  return (
    <div className="container">
      <Header />
      <FeedbackList />
    </div>
  );
}
