import { Input } from "@chakra-ui/input";
import { Form } from "@remix-run/react";
import { useState } from "react";

export function PostForm (){
    
    return (
        <>

        <h3 style={{color:"green"}}>Create Post</h3>
        <Form method="post">
            <Input type="hidden" name="actionType" value="create" />
            <Input type="text" name="title" required /> <button type="reset">X</button> <br />
            <button type="submit" style={{backgroundColor:"black",color:"white",marginTop:"10px",cursor:"pointer"}}  >submit</button> <br />
        </Form>
        
        </>
    )
}