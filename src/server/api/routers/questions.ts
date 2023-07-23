import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const questionsRouter = createTRPCRouter({
  getAllQuestions: publicProcedure.query(async ({}) => {
    const questions =
      await prisma.$queryRaw`SELECT * FROM Questions ORDER BY RAND()`;

    //const questions = await ctx.prisma.questions.findMany({});

    return questions;
  }),
});
