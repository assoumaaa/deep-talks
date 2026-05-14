import {
  GetCurrentPlayer,
  GetNextPlayer,
  GetPrevPlayer,
  GetRandomPlayer,
} from "~/helpers/Player";
import { HiArrowNarrowLeft, HiOutlineRefresh } from "react-icons/hi";
import { useEffect, useState } from "react";

import Button from "~/components/Button";
import { GetTitleFromHref } from "~/helpers/CategoryListTitles";
import Link from "next/link";
import { LoadingPage } from "~/components/Loading";
import { QuestionsLayout } from "~/components/QuestionsLayout";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type GetAllQuestions = RouterOutputs["questions"]["getQuestionByCategory"];

const ShowQuestion = ({
  questions,
  categories,
}: {
  questions: GetAllQuestions;
  categories: string;
}) => {
  const router = useRouter();
  const title = GetTitleFromHref("categories/" + categories);

  const [nextPlayer, setNextPlayer] = useState<string>("");
  const [randomPlayer, setRandomPlayer] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const savedIndex = sessionStorage.getItem(
        "currentQuestionIndex " + `${categories}`
      );
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    }
  );

  const mutation = api.questions.refreshQuestions.useMutation();
  const currentQuestion = questions.data[currentQuestionIndex];

  const handleNextQuestion = () => {
    let nextIndex = currentQuestionIndex + 1;

    while (
      questions.data[nextIndex]?.playerSpecific &&
      nextPlayer === "NO_NAME"
    ) {
      nextIndex++;
    }

    setCurrentQuestionIndex(nextIndex);
    setNextPlayer(GetNextPlayer());
  };

  const handlePrevQuestion = () => {
    let prevIndex = currentQuestionIndex - 1;

    while (
      prevIndex >= 0 &&
      questions.data[prevIndex]?.playerSpecific &&
      nextPlayer === "NO_NAME"
    ) {
      prevIndex--;
    }

    setCurrentQuestionIndex(prevIndex);
    setNextPlayer(GetPrevPlayer());
  };

  const handleRefresh = () => {
    mutation.mutate(
      { content: categories },
      {
        onSuccess: () => {
          sessionStorage.setItem(
            "currentQuestionIndex " + `${categories}`,
            String(0)
          );
          router.reload();
        },
      }
    );
  };

  useEffect(() => {
    setNextPlayer(GetCurrentPlayer());
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "currentQuestionIndex " + `${categories}`,
      String(currentQuestionIndex)
    );

    if (!currentQuestion) return;

    if (currentQuestion.playerSpecific) {
      setRandomPlayer(GetRandomPlayer(nextPlayer));
    }
  }, [currentQuestionIndex, categories, currentQuestion, nextPlayer]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between p-5 md:p-8">
      <div className="flex w-full items-center justify-between">
        <Link
          href="/categories"
          className="rounded-full p-2 text-ink/80 transition hover:bg-white/10 hover:text-ink"
          aria-label="Back"
        >
          <HiArrowNarrowLeft className="text-2xl" />
        </Link>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {title?.name}
          </span>
          {nextPlayer !== "NO_NAME" && nextPlayer !== "" && (
            <span className="font-display text-xl italic text-primary md:text-2xl">
              {nextPlayer}&apos;s turn
            </span>
          )}
        </div>

        <button
          onClick={handleRefresh}
          className="rounded-full p-2 text-ink/80 transition hover:rotate-180 hover:bg-white/10 hover:text-ink"
          aria-label="Reshuffle"
        >
          <HiOutlineRefresh className="text-2xl" />
        </button>
      </div>

      <div
        key={currentQuestionIndex}
        className="flex max-w-2xl flex-1 items-center justify-center px-2 text-center animate-floatIn"
      >
        {currentQuestion ? (
          <p className="font-display text-3xl leading-snug text-ink md:text-5xl">
            {currentQuestion.playerSpecific
              ? currentQuestion.content.replace("<insert name>", randomPlayer)
              : currentQuestion.content}
          </p>
        ) : (
          <div className="space-y-3">
            <p className="font-display text-2xl italic text-ink md:text-3xl">
              That&apos;s all the questions.
            </p>
            <p className="text-sm text-muted">
              Tap reshuffle for a fresh round.
            </p>
          </div>
        )}
      </div>

      <div className="flex w-full justify-center gap-3">
        {currentQuestionIndex > 0 && (
          <Button
            onClick={handlePrevQuestion}
            title="Back"
            variant="ghost"
            fontSize="text-sm"
          />
        )}

        {currentQuestion && (
          <Button onClick={handleNextQuestion} title="Next" fontSize="text-sm" />
        )}
      </div>
    </div>
  );
};

export default function Questions() {
  const router = useRouter();
  const categories = router.query.categories as string;

  const { data, isLoading, isError, error } =
    api.questions.getQuestionByCategory.useQuery({ content: categories || "" });

  if (isLoading) return <LoadingPage />;
  if (isError) return <div className="p-8 text-center text-muted">Error: {error?.message}</div>;
  if (!data) return <div className="p-8 text-center text-muted">Server is down sorry!</div>;

  return (
    <QuestionsLayout>
      <ShowQuestion questions={data} categories={categories} />
    </QuestionsLayout>
  );
}
