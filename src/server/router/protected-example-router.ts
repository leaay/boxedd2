import { createProtectedRouter } from "./protected-router";
import {z} from "zod";
// Example router with queries that can only be hit if the user requesting is signed in
export const protectedExampleRouter = createProtectedRouter()
  .mutation("add-product", {
    input: z.object({
      name: z.string(),
      price: z.number(),
      desc: z.string(),
      slug: z.string(),
      img: z.string(),
      category: z.string(),
    }),

    async resolve({ ctx , input }) {
        return await ctx.prisma.products.create({
            data: {
                name: input.name,
                price: input.price,
                desc: input.desc,
                slug: input.slug,
                img: input.img,
                category: input.category
            }
        })
      },
  })
  .mutation("delete-product", {
    input: z.string(),
    async resolve({ ctx , input }) {
        return await ctx.prisma.products.delete({
            where: {
                id: input
            }
        })
    }
  })