import { useEffect, useState } from "react"

const PostNew=(props)=>
{
    const[addtoParent, setAddtoParent]=useState({userID:0, inputTitle: '', inputBody:'' ,genMaxPostsId:''})
    const [changeAddHandler,setChangeAddHandler]=useState({inputTitle: '', inputBody:''})

    useEffect(()=>
    {
        setAddtoParent({userID:props.user.id, inputTitle:changeAddHandler.inputTitle, inputBody:changeAddHandler.inputBody,genMaxPostsId:props.user.genMaxPosts+1})
    },[changeAddHandler.inputTitle, changeAddHandler.inputBody])

   
    const TitleAddHandler=(e)=>{
        setChangeAddHandler({...changeAddHandler, inputTitle:e.target.value})
    }

    const BodyAddHandler=(e)=>{
        setChangeAddHandler({...changeAddHandler, inputBody:e.target.value})
    }



    const SubmitAddPost=(e)=>
    {
         e.preventDefault();

       if    (addtoParent.inputTitle!=''&& addtoParent.inputBody!='')
       {
        props.addNewPost(addtoParent);
       }     
       else{
        alert('Please add post')
       }
       
    }

     

    const CancelBack=()=>{
       props.back()
    }

   
    return (
        <form  className="new_task" onSubmit={SubmitAddPost} >
            <div >
                <div>
                    <label> Title:  </label>
                    <input placeholder="please add title" onChange={TitleAddHandler}/> <br/>
                
                    <label> Body:   </label>
                    <input placeholder="please add body" onChange={BodyAddHandler}/> <br/>
                 </div>
            </div>
            <div className="new_task_buttons">
                <input type="submit" value="Add"/>
                <input type= "button" value="Cancel" onClick= {CancelBack}/>
            </div>
          
        </form>
    )
}


export default PostNew;