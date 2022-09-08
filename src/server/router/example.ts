import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return 'red'
    },
  })
  .query('reg',{
    async resolve({ctx}){
      return 'green'
    }
  });
