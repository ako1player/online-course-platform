import { title } from "process";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getCourseById: protectedProcedure.input(z.object({
    courseId: z.string(),
    })
  )
    .query(({ctx, input}) =>{
      return ctx.prisma.course.findUnique({
        where: {
          id: input.courseId,
        },
      });
    }),
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
  updateCourse: protectedProcedure
  .input(z.object({ title: z.string(), courseId: z.string() }))
  .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.course.updateMany({
        where: {
          id: input.courseId,
          userId,
        },
          data: {
              title: input.title,
              }
          });
          return {status: "updated"};
      }),
});
