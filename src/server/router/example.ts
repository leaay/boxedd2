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
      console.log(ctx)
      return await ctx.prisma.user.create({
        data: {
          email: 'admin',
          // name: 'Elsa Prisma',
          password: '123456',
          // role: 'ADMIN'
        },
      })
    }
  });
