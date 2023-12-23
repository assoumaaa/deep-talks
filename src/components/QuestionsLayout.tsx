import type { PropsWithChildren } from "react";

export const QuestionsLayout = (props: PropsWithChildren) => {
  return (
    <main>
      <div className="flex h-screenWithNav w-screen bg-thirdly p-3 ">
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-white shadow-2xl">
          {props.children}
        </div>
      </div>
    </main>
  );
};
