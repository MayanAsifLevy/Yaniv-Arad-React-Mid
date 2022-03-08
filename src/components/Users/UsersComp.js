import { useEffect, useState } from "react";
import OtherData from "./OtherData";

function UsersComp(props)
{
    const [isCompleted, setIsCompleted]= useState(false);
    const [isMouseOver, setIsMouseOver]= useState(false);
    const [forOtherData,setForOtherData]=useState({});
    const[fromOtherData, setFromOtherData]=useState({});
    let[changeHandler, setChangeHandler]=useState({id:'' , name:'', email:'' , street:'', city: '', zipcode:'', showDetails:''})

    const [user2Parent, setUser2Parent]=useState({})
    let[delUser, setDelUser] = useState(0)//useState({id:props.user_data.id })
    const[idIsSelected, setIdIsSelected]= useState(false)
  
   
    useEffect(()=>
    { 
       
        if (props.compChangColor)
        {
            console.log('hhooooo')
             setIsCompleted(true)                       
        }
       
    
    },[props, isCompleted])


    useEffect(()=>
    {
        setChangeHandler({id:props.user_data.id , name:props.user_data.name, email:props.user_data.email , street: props.user_data.address.street, city: props.user_data.address.city,  zipcode: props.user_data.address.zipcode , showDetails: props.user_data.showDetails  })
        setDelUser(props.user_data.id)

        if (props.user_data.showDetails==false)
        {
            setIdIsSelected(false)
        }
    
       
    },[props, idIsSelected]
    )
    
    

    useEffect(()=>
    {
        setUser2Parent({
            id: changeHandler.id, name:changeHandler.name, email: changeHandler.email, street:fromOtherData.street , city: fromOtherData.city, zipcode:fromOtherData.zipcode

        })
        
    }, [changeHandler.name, changeHandler.email, fromOtherData.street, fromOtherData.city, fromOtherData.zipcode])
    
    
    const nameHandler= (e)=>
        {
            setChangeHandler({...changeHandler, name:e.target.value})
        }


    const emailHandler= (e)=>
    {
        setChangeHandler({...changeHandler, email:e.target.value})
    }

    const mouseOverOtherData=()=>
    {
        setIsMouseOver(true);
        setForOtherData({id:changeHandler.id, street:changeHandler.street, city:changeHandler.city, zipcode:changeHandler.zipcode})
        
    }

    const clickOtehrDara=()=>
    {
        setIsMouseOver(false);
        
    }

    const fromOtherdata = (e)=>
    {
        setFromOtherData(e);                         
    }


    const update2Parent=(e)=>
    {
        e.preventDefault();
           
        props.onUpdate(user2Parent);

    }

    const deleteUser=(e)=>
    {
        setIsMouseOver(false);
        props.onDelUser(delUser);
    }

    const selectUser=()=>
    {
        if(props.user_data.id==props.toCompSelectedID )
        {
            setIdIsSelected(false)
        }

        if ((idIsSelected) )
        {
            setIdIsSelected(false )
            props.onSelectedID(0) 
        }
        else
        {
            setIdIsSelected(true )
            props.onSelectedID(changeHandler.id)
        }


        
    }

    return (
        
        <form className='userComp' onSubmit={update2Parent} style={{borderColor:isCompleted? 'green': 'red',background:idIsSelected? 'Orange': 'white' }} >
           
            <div className="userComp_id">
                <label onClick={selectUser}> ID: </label>
                {changeHandler.id}
            </div>

            <div className="userComp_name">
                Name: <input type='text' value={changeHandler.name}  onChange={nameHandler}/>   
            </div>

             <div className="userComp_email">       
                 Email: <input type='text' value={changeHandler.email}  onChange={emailHandler}/>
             </div><br/>

         
                <div className='userCompButtons_other' onMouseOver={mouseOverOtherData} onClick={clickOtehrDara}>
                  
                    Other Data
                    </div>
                    <div>
                        {
                            isMouseOver && <OtherData user_data={forOtherData} onOtherData={fromOtherdata}/>
                            
                        }
                        
                    </div>

               
                 <div  className='userCompButtons_right' >
                     <input type='submit' value='Update' className="buttons"  /> 
                     <input type='button' value='delete' className="buttons" onClick={deleteUser}/> 
                 </div> 



           
        </form>
        

    )
}

export default UsersComp;