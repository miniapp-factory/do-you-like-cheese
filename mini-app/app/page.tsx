import Link from "next/link";
import { title, description, url } from "@/lib/metadata";

export async function generateMetadata() {
  return {
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: `${url}/icon.png`,
        ogTitle: title,
        ogDescription: description,
        ogImageUrl: `${url}/icon.png`,
        button: {
          // button configuration if needed
        },
      }),
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <span className="text-2xl">{title}</span>
      <span className="text-muted-foreground">{description}</span>
      <p className="text-center mt-4">
        Ready to find out if you’re a cheese lover? Click the button below to start the quiz!
      </p>
      <Link
        href="/quiz"
        className="mt-4 inline-block px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
      >
        Start Quiz
      </Link>
    </main>
  );
}
