import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { AlertTitle, AlertDescription } from "./ui/alert";

export interface QuizProps {
  questionIndex: number;
}

const cheeses = Array.from({ length: 50 }, (_, i) => ({
  question: `Do you like cheese #${i + 1}?`,
  options: ["Love it", "Like it", "Not a fan"],
}));

export function Quiz({ questionIndex }: QuizProps) {
  const router = useRouter();
  const totalQuestions = cheeses.length;
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selected) return;
    const stored = sessionStorage.getItem("quizAnswers");
    const answers = stored ? JSON.parse(stored) : [];
    answers[questionIndex] = selected;
    sessionStorage.setItem("quizAnswers", JSON.stringify(answers));
    if (questionIndex + 1 < totalQuestions) {
      router.push(`/quiz/${questionIndex + 1}`);
    } else {
      router.push("/quiz/result");
    }
  };

  if (questionIndex >= totalQuestions) {
    const stored = sessionStorage.getItem("quizAnswers");
    const answers = stored ? JSON.parse(stored) : [];
    const score = answers.reduce((acc, ans) => {
      if (ans === "Love it") return acc + 2;
      if (ans === "Like it") return acc + 1;
      return acc;
    }, 0);
    const maxScore = totalQuestions * 2;
    const percentage = Math.round((score / maxScore) * 100);
    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <AlertTitle>Your Cheese Score</AlertTitle>
        </CardHeader>
        <CardContent>
          <AlertDescription>
            You scored {percentage}% on the cheese quiz!
          </AlertDescription>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </CardFooter>
      </Card>
    );
  }

  const { question, options } = cheeses[questionIndex];

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <h2 className="text-xl font-semibold">{question}</h2>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selected ?? undefined} onValueChange={setSelected}>
          {options.map((opt) => (
            <RadioGroupItem key={opt} value={opt} className="flex items-center space-x-2">
              <span>{opt}</span>
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={!selected}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
