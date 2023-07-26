import { z } from "zod";
import { redis } from "~/components/redis";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

// Define the schema for your Question data
const questionSchema = z.object({
  content: z.string(),
  id: z.string(),
  category: z.string(),
});

type Question = z.infer<typeof questionSchema>;

export const questionsRouter = createTRPCRouter({
  getAllQuestions: publicProcedure.query(async ({}): Promise<Question[]> => {
    const cachedQuestionsExist = await redis.exists("questions");

    if (cachedQuestionsExist) {
      const questions = await redis.get("questions");
      if (questions === null) throw new Error("questions is null");

      console.log("returned from cache");

      // Parse the data from cache and validate against the schema
      const parsedQuestions = questionSchema
        .array()
        .parse(JSON.parse(questions));
      return parsedQuestions;
    }

    const questions =
      await prisma.$queryRaw`SELECT * FROM Questions ORDER BY RAND()`;

    await redis.set("questions", JSON.stringify(questions));

    console.log("returned from db");

    // Validate the data from the database against the schema
    const parsedQuestions = questionSchema.array().parse(questions);
    return parsedQuestions;
  }),
});
