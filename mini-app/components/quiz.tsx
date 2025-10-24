"use client";

import { useState } from "react";

const questions = [
  "Do you enjoy the taste of cheddar?",
  "Do you like cheese on pizza?",
  "Do you prefer aged cheese over fresh cheese?",
  "Do you eat cheese as a snack?",
  "Do you enjoy cheese in salads?",
  "Do you like cheese in sandwiches?",
  "Do you enjoy cheese fondue?",
  "Do you prefer cheese over other dairy products?",
  "Do you like cheese in desserts?",
  "Do you enjoy trying new cheese varieties?",
];

export function Quiz() {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = answers.filter((a) => a === "yes").length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cheese Preference Quiz</h1>
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          {questions.map((q, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="font-medium mb-1">{q}</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value="yes"
                    checked={answers[idx] === "yes"}
                    onChange={() => handleChange(idx, "yes")}
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`q${idx}`}
                    value="no"
                    checked={answers[idx] === "no"}
                    onChange={() => handleChange(idx, "no")}
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">
            You answered {score} out of {questions.length} questions with "Yes".
          </p>
          {score >= 6 ? (
            <p className="text-green-600 font-medium">
              🎉 You like cheese!
            </p>
          ) : (
            <p className="text-red-600 font-medium">
              😕 You might not be a cheese fan.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
