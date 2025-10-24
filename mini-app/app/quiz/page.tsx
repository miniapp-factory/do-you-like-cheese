import { redirect } from "next/navigation";

export default function QuizRoot() {
  // Redirect to the first question
  redirect("/quiz/0");
}
