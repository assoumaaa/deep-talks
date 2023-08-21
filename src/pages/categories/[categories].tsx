import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";
import { type RouterOutputs, api } from "~/utils/api";
import { QuestionsLayout } from "~/components/questionsLayout";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft, HiOutlineRefresh } from "react-icons/hi";
import Link from "next/link";
import { Titles } from "~/components/titles";
import { GetNextPlayer } from "~/helpers/getNextPlayer";

type GetAllQuestions = RouterOutputs["questions"]["getQuestionByCategory"];
const ShowQuestion = (questions: GetAllQuestions) => {
  const router = useRouter();
  const categories = router.query.categories as string;
  const title = Titles(categories);
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

  const [nextPlayer, setNextPlayer] = useState<string>("");

  useEffect(() => {
    setNextPlayer(GetNextPlayer());
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "currentQuestionIndex " + `${categories}`,
      String(currentQuestionIndex)
    );
  }, [currentQuestionIndex, categories]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setNextPlayer(GetNextPlayer());
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
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
        <span className="text-xl md:text-4xl">{title}</span>
        {nextPlayer !== "NO_NAME" ? (
          <span className="text-xl italic text-primary underline md:text-4xl">
            {nextPlayer} &apos;s Turn !
          </span>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-6">
        <span className="text-center text-3xl italic text-black md:text-5xl">
          {currentQuestion ? (
            currentQuestion.content
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
