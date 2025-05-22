import {PrismaClient} from '../../src/generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,jwt,sign,verify} from 'hono/jwt'
import {signinInput,signupInput} from '@kushalchetri/common-blog'
import { Hono } from 'hono'

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET:string
    };
  }>();

  userRouter.post('/signup', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(400)
      return c.json({
        message:"invalid email"
      })
    }
    const jwtSecret = c.env.JWT_SECRET

    const User = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })

    if(User){
      c.status(403);
      return c.json({
        message:"user Exists"
      })
    }
  
    const user = await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        password:body.password
      }
    })
  
    const token = await sign({id:user.id,name:user.name},jwtSecret)
  
    return c.json({
      jwt:token
    })
  })
  
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
      c.status(400)
      return c.json({
        message:"credentials are wrong"
      })
    }
    const jwtSecret = c.env.JWT_SECRET;
  
    const user = await prisma.user.findUnique({
      where:{
        email:body.email,
      }
    })
  
    if(!user){
      c.status(403);
      return c.json({error:"User not found"})
    }
  
    const jwt = await sign({id:user.id,name:user.name},jwtSecret)
    return c.json({jwt})
  })