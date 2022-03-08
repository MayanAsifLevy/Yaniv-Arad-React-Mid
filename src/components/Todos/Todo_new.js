import { useEffect, useState } from "react"

const TodoNew=(props)=>
{
    const[addtoParent, setAddtoParent]=useState({userID:0, inputTitle: '', GeneralMaxTodoId:''})
    const [changeAddHandler,setChangeAddHandler]=useState({inputTitle: ''})

    useEffect(()=>
    {
        setAddtoParent({userID:props.user.id, inputTitle:changeAddHandler.inputTitle, GeneralMaxTodoId:props.user.genMaxTodos+1})
    },[changeAddHandler.inputTitle])

    const CancelBack=()=>{
        props.back()
     }

    const TitleAddHandler=(e)=>{
        setChangeAddHandler({...changeAddHandler, inputTitle:e.target.value})
    }


    const SubmitAddTodo=(e)=>
    {
         e.preventDefault();

       if    (addtoParent.inputTitle!='')
       {
        props.addNewTodo(addtoParent);
       }     
       else{
        alert('Please add Task title')
       }
       
    }

     
     
    return (
        <form  className="new_task" onSubmit={SubmitAddTodo}>
            <div >
            <label> Title: </label>
                 <input placeholder="please add title" onChange={TitleAddHandler}/>
            </div>
            <div className="new_task_buttons">
                <input type="submit" value="Add"/>
                <input type= "button" value="Cancel" onClick= {CancelBack}/>
            </div>
          
        </form>
    )
}

export default TodoNew;