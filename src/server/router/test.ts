import { createRouter } from "./context";
import { z } from "zod";

export const testRouter = createRouter()
  .query("red", {
    async resolve({ ctx }) {
      return 'red'
    },
  })
  .mutation("add-product", {
    async resolve({ ctx }) {
        return await ctx.prisma.products.create({
            data: {
                name: 'BOXY HOODIE',
                desc:   "A boxy hoodie with a drawstring hood and kangaroo pocket.",
                category: 'hoodies',
                img:'img'
            }
        })
      },
  });
