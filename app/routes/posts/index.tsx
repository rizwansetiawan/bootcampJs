import { ActionArgs, redirect } from "@remix-run/node";
import {Form, useLoaderData, useNavigation} from "@remix-run/react"
import { createPost, deletePost, getPost, updatePosted } from "~/modules/posts/post.services";
import { PostForm } from "./postForm";
import { useState } from "react";
import {Button, Checkbox, Spinner} from "@chakra-ui/react"
export async function loader (){
    const posts = await getPost()
    return posts;
}
export async function action ({request}:ActionArgs){
    
    const formData = await request.formData();
    const actionType = formData.get("actionType");
    const postId = formData.get("postId");
    const updatePost = formData.get("updatePost");
    const titles = formData.get("title")

    if(actionType === "create" && titles ){
        await createPost ({
            title:titles
        })
        return titles
    }
    if(actionType === "update" && postId &&updatePost ){
        await updatePosted(postId,updatePost)
        return redirect("/posts")
    }
    if(actionType === "delete" && postId){
        await deletePost(parseInt(postId as string))
        return redirect("/posts")
    }
    const title = formData.get("title")

    
    return title
}
export default function PostIndex(){
    const data = useLoaderData<typeof loader>()
    const {state} = useNavigation()
    const [form,setForm] = useState(false)
    const [open,setOpen] = useState(false)
    const UpdateForm = ()=>{
        setForm(true)
        // setOpen(true)
    }
    const CloseForm = ()=>{
        setForm(false)
    }
    return (
       <>
       <PostForm/>
       {state === "loading" ? (
       <Spinner fontSize={"5xl"} />
       ): (
       <ul>
       {data.map((item)=>(

        <li key={item.id}> {item.title}
     <Checkbox></Checkbox>
            <Form method="post">
                <input type="hidden" name="actionType" value="delete" />
                <input type="hidden" name="postId" value={item.id} />
                <Button type="submit" cursor={"pointer"} bg={"gray.400"} borderRadius={"5px"}  >delete</Button>
            </Form>

            <Form method="post" >
        {form ?
                <>
                <input type="hidden" name="actionType" value="update" /><input type="hidden" name="postId" value={item.id} /><input type="text" name="updatePost" placeholder="update Post" />
                <button type="submit"  >update</button>
                </>
        : <Button type="button" onClick={UpdateForm} value={item.id} bg={"yellow"}  >update</Button> }
                
            </Form>

        </li>

       ))}
       </ul>
       
       )}
       </>
    )
}