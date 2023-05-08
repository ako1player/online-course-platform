import { title } from "process";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCourse: protectedProcedure
    .query(({ctx}) =>{
      return ctx.prisma.course.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    }),
  createCourse: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const newCourse = ctx.prisma.course.create({
            data: {
                title: input.title,
                description: input.description,
                userId: userId,
                }
            });
            return newCourse;
        }),
});
