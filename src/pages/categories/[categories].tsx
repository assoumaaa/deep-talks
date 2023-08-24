import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";
import { type RouterOutputs, api } from "~/utils/api";
import { QuestionsLayout } from "~/components/questionsLayout";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft, HiOutlineRefresh } from "react-icons/hi";
import Link from "next/link";
import { GetNextPlayer } from "~/helpers/getNextPlayer";
import { GetRandomPlayer } from "~/helpers/getRandomPlayer";
import { GetPrevPlayer } from "~/helpers/getPrevPlayer";
import { GetTitleFromHref } from "~/helpers/categListTitles";

type GetAllQuestions = RouterOutputs["questions"]["getQuestionByCategory"];
const ShowQuestion = (questions: GetAllQuestions) => {
  const [nextPlayer, setNextPlayer] = useState<string>("");
  const [randomPlayer, setRandomPlayer] = useState<string>("");
  const router = useRouter();
  const categories = router.query.categories as string;
  const title = GetTitleFromHref("categories/" + categories);
  const mutation = api.questions.refreshQuestions.useMutation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const savedIndex = sessionStorage.getItem(
        "currentQuestionIndex " + `${categories}`
      );
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    }
  );
  const currentQuestion = questions.data[currentQuestionIndex];

  useEffect(() => {
    setNextPlayer(GetNextPlayer());
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

  const handleNextQuestion = () => {
    let nextIndex = currentQuestionIndex + 1;

    // While there are more questions and the next question is player-specific without a player's name
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

    // While we're not at the beginning and the previous question is player-specific without a player's name
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
          window.location.reload();
        },
      }
    );
  };

  return (
    <div className="relative flex h-full w-11/12 flex-col items-center justify-evenly ">
      <Link
        href="/categories"
        className="absolute left-0 top-0 cursor-default p-4 text-3xl md:text-5xl"
      >
        <HiArrowNarrowLeft className="cursor-pointer" />
      </Link>

      <button
        onClick={handleRefresh}
        className="absolute right-0 top-0 cursor-default p-4 text-3xl md:text-5xl"
      >
        <HiOutlineRefresh className="cursor-pointer" />
      </button>

      <div className="flex flex-col items-center justify-center gap-2">
        <span className="flex items-center gap-1 text-xl md:text-4xl">
          {title?.name}
        </span>
        {nextPlayer !== "NO_NAME" ? (
          <span className="text-xl italic text-primary underline md:text-4xl">
            {nextPlayer} &apos;s Turn !
          </span>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-6">
        <span className="text-center text-3xl italic text-black md:text-5xl">
          {currentQuestion ? (
            currentQuestion.playerSpecific ? (
              currentQuestion.content.replace("<insert name>", randomPlayer)
            ) : (
              currentQuestion.content
            )
          ) : (
            <span className="text-center text-3xl text-black md:text-4xl">
              Waiting for junior to write more questions!
            </span>
          )}
        </span>
        <div className="flex w-full justify-evenly ">
          {currentQuestionIndex > 0 && (
            <button
              onClick={handlePrevQuestion}
              className="group relative flex h-14 w-28 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
            >
              <span className="relative  flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-xl font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
                Back
              </span>
            </button>
          )}

          {currentQuestion && (
            <button
              onClick={handleNextQuestion}
              className="group relative flex h-14 w-28 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
            >
              <span className="relative  flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-xl font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
                Next
              </span>
            </button>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

const LoadData = () => {
  const router = useRouter();
  const categories = router.query.categories as string;

  const { data, isLoading } = api.questions.getQuestionByCategory.useQuery({
    content: categories || "",
  });

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>There is no data</div>;

  return <ShowQuestion {...data} />;
};

export default function Questions() {
  return (
    <QuestionsLayout>
      <LoadData />
    </QuestionsLayout>
  );
}
