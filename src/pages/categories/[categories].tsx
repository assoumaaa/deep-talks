import {
  GetCurrentPlayer,
  GetNextPlayer,
  GetPrevPlayer,
  GetRandomPlayer,
} from "~/helpers/Player";
import { HiArrowNarrowLeft, HiOutlineRefresh } from "react-icons/hi";
import { cache, useEffect, useState } from "react";

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
    <div className="relative flex h-full w-11/12 flex-col items-center justify-between">
      <div className="flex w-full items-center justify-between p-4">
        <Link href="/categories">
          <span className="text-2xl md:text-3xl">
            <HiArrowNarrowLeft className="cursor-pointer" />
          </span>
        </Link>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xl md:text-3xl">{title?.name}</span>
          {nextPlayer !== "NO_NAME" && (
            <span className="text-2xl italic text-primary  md:text-4xl">
              {nextPlayer}'s Turn!
            </span>
          )}
        </div>

        <button onClick={handleRefresh} className="text-2xl md:text-3xl">
          <HiOutlineRefresh className="cursor-pointer" />
        </button>
      </div>

      <div className="text-center text-2xl italic text-black md:w-1/2 md:text-3xl">
        {currentQuestion ? (
          currentQuestion.playerSpecific ? (
            currentQuestion.content.replace("<insert name>", randomPlayer)
          ) : (
            currentQuestion.content
          )
        ) : (
          <span className="text-3xl text-black md:text-4xl">
            Waiting for junior to write more questions!
          </span>
        )}
      </div>

      <div className="just flex w-full justify-center gap-5 p-5 md:w-1/2">
        {currentQuestionIndex > 0 && (
          <Button
            onClick={handlePrevQuestion}
            fontSize="text-md"
            title="Back"
          />
        )}

        {currentQuestion && (
          <Button
            onClick={handleNextQuestion}
            fontSize="text-md"
            title="Next"
          />
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
  if (isError) return <div>Error: {error?.message}</div>;
  if (!data) return <div>Server is down sorry!</div>;

  return (
    <QuestionsLayout>
      <ShowQuestion questions={data} categories={categories} />
    </QuestionsLayout>
  );
}
