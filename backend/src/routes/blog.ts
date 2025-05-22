import {PrismaClient,Prisma} from "../generated/prisma/edge"
import { withAccelerate } from "@prisma/extension-accelerate";
import { updateBlogInput,createBlogInput } from "@kushalchetri/common-blog";
import { verify } from "hono/jwt";
import { Hono } from "hono";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    };
    Variables:{
        user:{
            id:string,
            name:string
        }
    }
}>();

blogRouter.use('/*',async(c,next)=>{
  
    const token = c.req.header('authorization') || "";
    const jwtSecret = c.env.JWT_SECRET
    if(!token){
      return c.json({mesage:"token header missing"})
    }
    const decoded = await verify(token,jwtSecret) as {id:string,name:string}
    c.set('user',{id:decoded.id,name:decoded.name})
    if(decoded.id){
      await next()
    }else{
      return c.json({message:"Unauthorized"})
    }
  })

 blogRouter.post('/',async(c)=>{
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({
            message:"give valid id and title or content"
        })
    }
    const {id} = c.get("user")
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const author = await prisma.user.findUnique({
        where:{
            id:id
        }
    })

    if(!author){
        c.status(404);
        return c.json({
            messsage:"User does not exist"
        })
    }

    const blog = await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:id
        }
    })

    if(!blog){
        c.status(403);
        return c.json({
            message:"Invalid inputs"
        })
    }

    return c.json({
        message:"Post published",   
        id:blog.id
    });
})

    blogRouter.put('/',async(c)=>{
        type Body = {id:string} & ({title:string,content?:string} | {content:string,title?:string})
        const body:Body =  await c.req.json();
        const {id} = c.get("user");
        const result = updateBlogInput.safeParse(body);
        if(!result.success){
            c.status(400);
            return c.json({ 
                message: result.error.errors[0].message || "give valid data"
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate());

        try{
            await prisma.blog.update({
            where:{
                id:body.id,
                authorId:id
            },
            data:{
                title:body.title,
                content:body.content
            }
        })
        }catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025"){
                c.status(403);
                return c.json({
                    message:"invalid user for updation"
                })
            }
        }

        return c.json({
            message:"Post updated"
        })

    })

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    return c.json(blogs)
})

blogRouter.get('/:id',async(c)=>{
    
    const id = c.req.param("id")
    
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id
            },
            select:{
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json(blog)
    }catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        })
    }
})
