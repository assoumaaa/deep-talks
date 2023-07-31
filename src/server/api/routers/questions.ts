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
): Promise<T> {
  const cachedData = cache.get<T>(cacheKey);

  if (cachedData) {
    console.log("returned from cache");
    return cachedData;
  }

  const dataFromDb = await dbQuery();
  cache.set(cacheKey, dataFromDb, CACHE_TTL);

  console.log("returned from db");

  return dataFromDb;
}

export const questionsRouter = createTRPCRouter({
  getAllQuestions: publicProcedure.query(async ({}): Promise<Question[]> => {
    return getFromCacheOrDb<Question[]>("questions", async () => {
      const questions =
        await prisma.$queryRaw`SELECT * FROM Questions ORDER BY RAND()`;

      // Validate the data from the database against the schema
      const parsedQuestions = questionSchema.array().parse(questions);
      return parsedQuestions;
    });
  }),

  getQuestionByCategory: publicProcedure
    .input(
      z.object({
        content: z.string().min(4).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      return getFromCacheOrDb<Question[]>(
        `questions-${input.content}`,
        async () => {
          const questions = await ctx.prisma.questions.findMany({
            where: { category: input.content },
          });

          // Validate the data from the database against the schema
          const parsedQuestions = questionSchema.array().parse(questions);
          return parsedQuestions;
        }
      );
    }),
});
