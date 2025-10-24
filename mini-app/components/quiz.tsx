"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    text: "Do you enjoy the taste of cheddar?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you like cheese on pizza?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you prefer aged cheese over fresh cheese?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you eat cheese as a snack?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you enjoy cheese in salads?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you like cheese in sandwiches?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you enjoy cheese fondue?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you prefer cheese over other dairy products?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you like cheese in desserts?",
    options: ["Love it", "Like it", "Not a fan"],
  },
  {
    text: "Do you enjoy trying new cheese varieties?",
    options: ["Love it", "Like it", "Not a fan"],
  },
];

export function Quiz({ questionIndex }: { questionIndex: number }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<string[]>(() => {
    const stored = sessionStorage.getItem("quizAnswers");
    return stored ? JSON.parse(stored) : Array(questions.length).fill("");
  });

  const question = questions[questionIndex];

  useEffect(() => {
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
    const next = questionIndex + 1;
    if (next < questions.length) {
      router.push(`/quiz/${next}`);
    } else {
      router.push(`/quiz/${next}`); // will show result
    }
  };

  if (!question) {
    // Show result
    const score = answers.reduce((acc, ans) => {
      if (ans === "Love it") return acc + 2;
      if (ans === "Like it") return acc + 1;
      return acc;
    }, 0);
    const maxScore = questions.length * 2;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cheese Preference Result</h1>
        <p className="text-xl font-semibold mb-2">
          You scored {score} out of {maxScore} ({percentage}%).
        </p>
        {percentage >= 60 ? (
          <p className="text-green-600 font-medium">
            🎉 You like cheese!
          </p>
        ) : (
          <p className="text-red-600 font-medium">
            😕 You might not be a cheese fan.
          </p>
        )}
        <button
          onClick={() => router.push("/quiz/0")}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cheese Preference Quiz</h1>
      <div className="flex flex-col gap-4">
        <label className="font-medium">{question.text}</label>
        <div className="flex flex-col gap-2">
          {question.options.map((opt) => (
            <label key={opt} className="flex items-center">
              <input
                type="radio"
                name={`q${questionIndex}`}
                value={opt}
                checked={answers[questionIndex] === opt}
                onChange={() => handleSelect(opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
