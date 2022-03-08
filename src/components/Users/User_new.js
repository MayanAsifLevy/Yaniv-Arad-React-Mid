import { useEffect, useState } from "react"

const UserNew=(props)=>
{
    const[addtoParent, setAddtoParent]=useState({inputName: '', inputEmail:'' })
    const [changeAddHandler,setChangeAddHandler]=useState({inputName: '', inputEmail:''})

    useEffect(()=>
    {
        setAddtoParent({inputName:changeAddHandler.inputName, inputEmail:changeAddHandler.inputEmail})
    },[changeAddHandler.inputName, changeAddHandler.inputEmail])

   
    const NameAddHandler=(e)=>{
        setChangeAddHandler({...changeAddHandler, inputName:e.target.value})
    }

    const EmailAddHandler=(e)=>{
        setChangeAddHandler({...changeAddHandler, inputEmail:e.target.value})
    }



    const SubmitAddPost=(e)=>
    {
         e.preventDefault();

       if    (addtoParent.inputName!='')
       {
        props.addNewUser(addtoParent);
       }     
       else{
        alert('Please add user name')
       }
       
    }

     

    const CancelBack=()=>{
       props.back()
    }

   
    return (
        <form  className="new_task" onSubmit={SubmitAddPost} >
            <div >
                <div>
                    <label> Name:  </label>
                    <input placeholder="please add Name" onChange={NameAddHandler}/> <br/>
                
                    <label> Email:   </label>
                    <input placeholder="please add Email" onChange={EmailAddHandler}/> <br/>
                 </div>
            </div>
            <div className="new_task_buttons">
                <input type="submit" value="Add"/>
                <input type= "button" value="Cancel" onClick= {CancelBack}/>
            </div>
          
        </form>
    )
}


export default UserNew;