import { useEffect, useState } from "react";

const OtherData=(props)=>
{

    let [changeHandler, setChangeHandler]=useState({id:"" , street:"", city: "", zipcode: ""})

    useEffect(()=>
    {
        setChangeHandler({id:props.user_data.id , street:props.user_data.street, city: props.user_data.city, zipcode: props.user_data.zipcode})
    },[] // we would like to set it only once (once it uploads) so we will be able to update it later in the input
    )

    const streetHandler= (e)=>
        {
            setChangeHandler({...changeHandler, street:e.target.value})
        }

    const cityHandler= (e)=>
    {
        setChangeHandler({...changeHandler, city:e.target.value})
    }

    
    const zipcodedtHandler= (e)=>
        {
            setChangeHandler({...changeHandler, zipcode:e.target.value})
        }

    
    useEffect(()=>
    {
        props.onOtherData(changeHandler) 
        
    },[changeHandler.street, changeHandler.city, changeHandler.zipcode])

    

    return(
       
            <div className="otherdata">
                
                <div className="userComp_name">
                   Street: <input type='text' value={changeHandler.street}  onChange={streetHandler}/>   
                </div>

                <div className="userComp_name">
                    City: <input type='text' value={changeHandler.city}  onChange={cityHandler}/>   
                </div>

                <div className="userComp_name">       
                    Zip Code: <input type='text' value={changeHandler.zipcode} onChange={zipcodedtHandler}/>
                </div><br/>

               
            </div>
      
    )
}

export default OtherData;