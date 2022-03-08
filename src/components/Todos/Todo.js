import { useEffect, useState } from 'react'

const Todo=(props)=>
{
    const [isCompleted, setIsCompleted]=useState(true)

    useEffect(()=>
    {
        if (props.forTask.completed==false)
        {
            setIsCompleted(false)
        }
    },[])

    const markCompleted=()=>
    {
        setIsCompleted(true)
        props.onCompletedDB({userId:props.forTask.userId, task_id:props.forTask.id,completed:true})

    }
    
    
    return (
        <div className="detail_comp">
            
            <div>
            <label className="label_task"> Title: </label>
            <span style={{textTransform: 'capitalize'}}>{props.forTask.title} </span><br/>
            </div>

            <div className="todo_comp">
                <div>
                    <label className="label_task"> Completed: </label>
                    <span style={{textTransform: 'capitalize'}}>{props.forTask.completed.toString()}</span>
                </div>
                <div>
                    {
                        
                !isCompleted && <input type='button' value='Mark Completed' onClick={markCompleted} />
                    }
                </div> 
            </div>
        </div>
    )
}

export default Todo;