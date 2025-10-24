"use client";

import type { PageProps } from "next/app";
import { Quiz } from "@/components/quiz";

export default function QuestionPage({
  params,
}: PageProps<{ question: string }>) {
  const index = parseInt(params.question, 10);
  return <Quiz questionIndex={index} />;
}
