import { createRouter } from "./context";
import { z } from "zod";


export const productRouter = createRouter()
.query('all',{
    async resolve({ctx}){
        return await ctx.prisma.products.findMany()
    }
})