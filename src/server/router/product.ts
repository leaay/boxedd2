import { createRouter } from "./context";
import { z } from "zod";


export const productRouter = createRouter()
.query('all',{
    input: z.string(),
    async resolve({ctx, input}) {
        if(input === 'all'){
            return await ctx.prisma.products.findMany()
        }

        return await ctx.prisma.products.findMany({
            where: {
                category: input
            }
        })
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
.query('find-category',{

    async resolve({ctx }){

        return await ctx.prisma.products.findMany({
            select:{
                category:true,
                
            },
            distinct:['category']

        })
    }
})
