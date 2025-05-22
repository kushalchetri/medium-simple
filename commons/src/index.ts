import { z } from "zod"

export const signupInput = z.object({
    email:z.string().email(),
    password:z.string(),
    name:z.string()
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email:z.string().email(),
    password:z.string(),
    name:z.string()
})

export type SigninInput = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string()
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    id:z.string(),
    title:z.string().optional(),
    content:z.string().optional()
}).refine((data)=>{
    return data.content || data.title
},{
    message:"at least one required content or title"
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>