"use client";

import { Quiz } from "@/components/quiz";

export default function QuestionPage({
  params,
}: {
  params: { question: string };
}) {
  const index = parseInt(params.question, 10);
  return <Quiz questionIndex={index} />;
}
