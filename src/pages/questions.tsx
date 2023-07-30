import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";
import { type RouterOutputs, api } from "~/utils/api";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { GetStaticProps } from "next";
import { QuestionsLayout } from "~/components/questionsLayout";

type GetAllQuestions = RouterOutputs["questions"]["getAllQuestions"];
const ShowQuestion = (questions: GetAllQuestions) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const savedIndex = localStorage.getItem("currentQuestionIndex");
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    }
  );

  useEffect(() => {
    localStorage.setItem("currentQuestionIndex", String(currentQuestionIndex));
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion)
    return (
      <div className="flex w-11/12 flex-col items-center justify-center gap-6">
        <span className="text-5xl text-black md:text-4xl">
          Waiting for junior to write more questions!
        </span>
        <div className="flex w-full justify-evenly ">
          <button
            onClick={handlePrevQuestion}
            className="group relative flex h-16 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-sm font-medium text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
          >
            <span className="relative  flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-2xl font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
              Back
            </span>
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex h-full w-11/12 flex-col items-center justify-evenly ">
      <span className="text-xl md:text-4xl">General 🌎</span>
      <div className="flex w-full flex-col gap-6">
        <span className="text-center text-3xl italic text-black md:text-6xl">
          {currentQuestion.content}
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

          <button
            onClick={handleNextQuestion}
            className="group relative flex h-16 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-sm font-medium text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
          >
            <span className="relative  flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-2xl font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
              Next
            </span>
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const LoadData = () => {
  const { data, isLoading } = api.questions.getAllQuestions.useQuery();

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>There is no data</div>;

  console.log(data);

  return <ShowQuestion {...data} />;
};

export default function Questions() {
  const { data: session } = useSession();

  return (
    <QuestionsLayout>
      <LoadData />
    </QuestionsLayout>
  );
}
