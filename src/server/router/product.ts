import { createRouter } from "./context";
import { z } from "zod";


export const productRouter = createRouter()
.query('all',{
    async resolve({ctx}){
        return await ctx.prisma.products.findMany()
    }
})
.query('find-one',{

    input:z.string(),

    async resolve({ctx , input}){

        return await ctx.prisma.products.findUnique({
            where:{
                slug:input
            },
        })
    }
})
