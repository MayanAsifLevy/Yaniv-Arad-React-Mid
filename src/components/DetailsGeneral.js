import { useEffect, useState } from "react";
import PostNew from "./Posts/Post_new";
import TodoNew from "./Todos/Todo_new";
import TaskGeneral from "./TaskGeneral";
import UserNew from "./Users/User_new";

const DetailsGeneral=(props)=>
{
    const[sectionName, setSectionName]=useState()
    let[userID, setUserID]=useState(0)
    const [isAdd, setIsAdd]=useState(true)
    const [showUpperAddButton, setShowUpperAddButton]=useState()

     useEffect( ()=>
     {
        setSectionName(props.sectionName);
       
        // in order to get the userID:
           if (props.users.length!=0)
           {
             setUserID(props.users.id);
           }

           if (props.sectionName=='AddUser')
           {
            setShowUpperAddButton(false)
           }
           else
           {
            setShowUpperAddButton(true)
           }

     })

     
     const Add=()=>
     {
        setIsAdd(!isAdd)
     }
    
     const back=()=>
     {
        setIsAdd(!isAdd)
     }

     const CompletedUpdateTodoDB=(e)=>
     {
        props.onCompletedDB2(e)
     }

     const newTodo=(e)=>
     {
      setIsAdd(!isAdd)
      props.addnewTodo(e)
     }

     const newPost=(e)=>
     {
      setIsAdd(!isAdd)
      props.addnewPost(e)
       }

     const newUser=(e)=>
     {
      props.addnewUser(e)
     }

     const backUser=()=>
     {
      props.cancelNewUser()
     }
 
    return(
        <div>
            
             <div className="details_title">
                <div>
                    <strong>{sectionName} - User {userID}</strong>
                </div>

                <div className="details_add">
                
                {setIsAdd && showUpperAddButton? <input type="button" value="Add" onClick={Add} style={{}}/>:null}
      
                </div>

            </div> 
            <div >

                {
                  isAdd?  <TaskGeneral users={props.users} sectionName={props.sectionName} onCompletedDB1={CompletedUpdateTodoDB}/>:null
                
                }

                {
                  !isAdd && props.sectionName=='Todos'? <TodoNew user={props.users} sectionName={props.sectionName}  back={back} addNewTodo={newTodo} />:null
                
                }

                {
                  !isAdd && props.sectionName=='Posts'? <PostNew user={props.users} sectionName={props.sectionName}  back={back} addNewPost={newPost}/>:null
                
                }
               
                {
                  props.sectionName=='AddUser'? <UserNew user={props.users} sectionName={props.sectionName} back={backUser} addNewUser={newUser}/>:null
                
                }

            </div>
        </div>

    )
}
export default DetailsGeneral;