import type { PropsWithChildren } from "react";

export const QuestionsLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screenWithNav w-screen items-center justify-center p-4 md:p-6">
      <div className="glass flex h-full w-full items-center justify-center rounded-3xl shadow-card">
        {props.children}
      </div>
    </main>
  );
};
