import { createRouter } from "./context";
import { z } from "zod";


export const productRouter = createRouter()
.query('all',{

    input: z.object({
        cat:z.string(),
        order:z.string(),
    }),

    async resolve({ctx, input}) {

        

        if(input.cat === 'all' && input.order === 'latest'){

            return await ctx.prisma.products.findMany()
        }

        if(input.cat === 'all' && input.order === 'high-low'){
            return await ctx.prisma.products.findMany({
                orderBy:{
                   price:'desc'
                }
            })
        }

        if(input.cat === 'all' && input.order === 'low-high'){
            return await ctx.prisma.products.findMany({
                orderBy:{
                   price:'asc'
                }
            })
        }

        if(input.cat !== 'all' && input.order === 'latest'){
            return await ctx.prisma.products.findMany({
                where:{
                    category:input.cat
                },
            })
        }

        if(input.cat !== 'all' && input.order === 'high-low'){
            return await ctx.prisma.products.findMany({
                where:{
                    category:input.cat
                },
                orderBy:{
                   price:'desc'
                }
            })
        }

        if(input.cat !== 'all' && input.order === 'low-high'){
            return await ctx.prisma.products.findMany({
                where:{
                    category:input.cat
                },
                orderBy:{
                   price:'asc'
                }
            })
        }


        return await ctx.prisma.products.findMany({
            where: {
                category: input.cat
            },

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
