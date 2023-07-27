import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";
import { type RouterOutputs, api } from "~/utils/api";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";

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
      <>
        <div className="text-2xl text-white ">
          Waiting for junior to write more questions sorry!
        </div>
        <button
          className="absolute bottom-0 left-0 p-4"
          onClick={handlePrevQuestion}
        >
          <HiArrowNarrowLeft className="text-3xl text-white" />
        </button>
      </>
    );

  return (
    <div>
      <div>
        <span className="font-title text-5xl text-white">
          {currentQuestion.content}
        </span>

        <button
          className="absolute bottom-0 right-0 p-4"
          onClick={handleNextQuestion}
        >
          <HiArrowNarrowRight className="text-3xl text-white" />
        </button>

        {currentQuestionIndex > 0 && (
          <button
            className="absolute bottom-0 left-0 p-4"
            onClick={handlePrevQuestion}
          >
            <HiArrowNarrowLeft className="text-3xl text-white" />
          </button>
        )}
      </div>
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
    <>
      <main>
        <div className="flex h-svh w-screen flex-col items-center justify-center">
          <Image
            src={"/hero.png"}
            alt="hero"
            width={200}
            height={300}
            className="flex md:hidden"
          />
          <div className=" flex h-screen w-screen items-center justify-center rounded-tl-3xl rounded-tr-3xl bg-primary md:h-screen  md:w-4/6 md:rounded-3xl md:bg-white">
            <div className="flex h-2/6 w-4/6 items-center justify-center rounded-3xl bg-primary md:relative">
              <LoadData />
            </div>
            <Image
              src={"/hero.png"}
              alt="hero"
              width={200}
              height={300}
              className="hidden md:flex"
            />
          </div>
        </div>
      </main>
    </>
  );
}
