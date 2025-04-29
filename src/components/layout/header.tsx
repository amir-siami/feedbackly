import Logo from "../../components/logo.tsx";
import PageHeading from "../page-heading.tsx";
import Pattern from "../pattern.tsx";
import FeedbackForm from "../feedback/feedback-form.tsx";

export default function Header() {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
}
