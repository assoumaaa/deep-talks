import Cache, { CacheDelete } from "~/helpers/Cache";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { prisma } from "~/server/db";
import { z } from "zod";

type Question = z.infer<typeof QuestionSchema>;

const QuestionSchema = z.object({
  content: z.string(),
  id: z.string(),
  category: z.string(),
  playerSpecific: z.number(),
});

export const questionsRouter = createTRPCRouter({
  getQuestionByCategory: publicProcedure
    .input(
      z.object({
        content: z.string().min(0).max(100),
      })
    )
    .query(async ({ input }) => {
      return Cache<Question[]>(`questions-${input.content}`, async () => {
        const questions = await prisma.$queryRaw`
            SELECT * FROM Questions
            WHERE category = ${input.content}
            ORDER BY RAND()
          `;

        const parsedQuestions = QuestionSchema.array().parse(questions);
        return parsedQuestions;
      });
    }),
  refreshQuestions: publicProcedure
    .input(
      z.object({
        content: z.string().min(4).max(100),
      })
    )
    .mutation(({ input }) => {
      CacheDelete(`questions-${input.content}`);
      return { status: "success", message: "Cache refreshed." };
    }),
});
