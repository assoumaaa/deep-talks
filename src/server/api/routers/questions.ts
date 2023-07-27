import { z } from "zod";
import NodeCache from "node-cache";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

const cache = new NodeCache();
const CACHE_KEY = "questions";
const CACHE_TTL = 1200; // 20 minutes

const questionSchema = z.object({
  content: z.string(),
  id: z.string(),
  category: z.string(),
});

type Question = z.infer<typeof questionSchema>;

export const questionsRouter = createTRPCRouter({
  getAllQuestions: publicProcedure.query(async ({}): Promise<Question[]> => {
    const cachedQuestions = cache.get<Question[]>(CACHE_KEY);

    if (cachedQuestions) {
      console.log("returned from cache");
      return cachedQuestions;
    }

    const questions =
      await prisma.$queryRaw`SELECT * FROM Questions ORDER BY RAND()`;

    cache.set(CACHE_KEY, questions, CACHE_TTL);

    console.log("returned from db");

    // Validate the data from the database against the schema
    const parsedQuestions = questionSchema.array().parse(questions);
    return parsedQuestions;
  }),
});
