import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPost(){
    return await prisma.post.findMany()
}
// CREATE POST
export async function createPost(data:any){
    const title =  await prisma.post.create({
        data:data
    })
    return title
}
// DELETE POST
export async function deletePost(deletePost:any){
    return prisma.post.delete({
        where:{
            id:parseInt(deletePost)
        }
    })
}
// UPDATE POST
export async function updatePosted(postId:any,updatePost:any){
    const updatedPosted = await prisma.post.update({
        where:{
            id:parseInt(postId)
        },
        data:{
            title:updatePost
        }
    })
    return updatedPosted
}