import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";
import { type RouterOutputs, api } from "~/utils/api";
import { QuestionsLayout } from "~/components/questionsLayout";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft, HiOutlineRefresh } from "react-icons/hi";
import Link from "next/link";
import { Titles } from "~/components/titles";

type GetAllQuestions = RouterOutputs["questions"]["getQuestionByCategory"];
const ShowQuestion = (questions: GetAllQuestions) => {
  const router = useRouter();
  const categories = router.query.categories as string;
  const title = Titles(categories);
  const mutation = api.questions.refreshQuestions.useMutation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const savedIndex = localStorage.getItem(
        "currentQuestionIndex " + `${categories}`
      );
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    }
  );
  const currentQuestion = questions.data[currentQuestionIndex];

  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex " + `${categories}`,
      String(currentQuestionIndex)
    );
  }, [currentQuestionIndex, categories]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleRefresh = () => {
    mutation.mutate(
      { content: categories },
      {
        onSuccess: () => {
          localStorage.setItem(
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

      <span className="text-xl md:text-4xl">{title} </span>
      <div className="flex w-full flex-col gap-6">
        <span className="text-center text-3xl italic text-black md:text-6xl">
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
              className="group relative flex h-16 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
            >
              <span className="relative  flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-2xl font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
                Back
              </span>
            </button>
          )}

          {currentQuestion && (
            <button
              onClick={handleNextQuestion}
              className="group relative flex h-16 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-sm font-medium text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
            >
              <span className="relative  flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-2xl font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
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
