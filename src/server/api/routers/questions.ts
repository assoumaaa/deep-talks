import { z } from "zod";
import NodeCache from "node-cache";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

type Question = z.infer<typeof questionSchema>;
const cache = new NodeCache();
const CACHE_TTL = 1200; // 20 minutes

const questionSchema = z.object({
  content: z.string(),
  id: z.string(),
  category: z.string(),
});

async function getFromCacheOrDb<T>(
  cacheKey: string,
  dbQuery: () => Promise<T>
): Promise<{ data: T; fromCache: boolean }> {
  const cachedData = cache.get<T>(cacheKey);

  if (cachedData) {
    console.log("returned from cache");
    return { data: cachedData, fromCache: true };
  }

  const dataFromDb = await dbQuery();
  cache.set(cacheKey, dataFromDb, CACHE_TTL);

  console.log("returned from db");

  return { data: dataFromDb, fromCache: false };
}

export const questionsRouter = createTRPCRouter({
  getQuestionByCategory: publicProcedure
    .input(
      z.object({
        content: z.string().min(0).max(100),
      })
    )
    .query(async ({ input }) => {
      return getFromCacheOrDb<Question[]>(
        `questions-${input.content}`,
        async () => {
          const questions = await prisma.$queryRaw`
            SELECT * FROM Questions
            WHERE category = ${input.content}
            ORDER BY RAND()
          `;

          // Validate the data from the database against the schema
          const parsedQuestions = questionSchema.array().parse(questions);
          return parsedQuestions;
        }
      );
    }),
  refreshQuestions: publicProcedure
    .input(
      z.object({
        content: z.string().min(4).max(100),
      })
    )
    .mutation(({ input }) => {
      cache.del(`questions-${input.content}`);
      return { status: "success", message: "Cache refreshed." };
    }),
});
