// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { testRouter } from "./test";

import { protectedExampleRouter } from "./protected-example-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge("test.", testRouter);
;

// export type definition of API
export type AppRouter = typeof appRouter;
