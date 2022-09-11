// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { protectedExampleRouter } from "./protected-example-router";
import { productRouter } from "./product";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge('products.' , productRouter)


// export type definition of API
export type AppRouter = typeof appRouter;
