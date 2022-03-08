import Post from "./Posts/Post";
import Todo from "./Todos/Todo";

const TaskGeneral=(props)=>

{
    const CompletedUpdateDB=(e)=>
    {
        props.onCompletedDB1(e)
    }
  

   return (
       <div>

          <div className="details_details">
       
               { props.sectionName=='Todos' &&
               
                   
                   props.users.todos.map(task=>{
                    
                       return(
                            <Todo key= {task.id} forTask={task} onCompletedDB={CompletedUpdateDB}/>
                            )
                   })
                       
               }

        { props.sectionName=='Posts' &&
                   
                   props.users.posts.map(task=>{
                       return(
                            <Post key= {task.id} forTask={task} />
                           
                       )

                   })
                       
               } 

         </div> 
      
       </div>
   )
}

export default TaskGeneral;