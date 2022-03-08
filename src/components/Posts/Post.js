const Post=(props)=>
{

    return (
        <div className="detail_comp">
            
            <div>
            <label className="label_task"> Title: </label>
            <span style={{textTransform: 'capitalize'}}>{props.forTask.title} </span><br/>
            </div>

            <div className="">
                <div>
                    <label className="label_task"> Body: </label>
                    <span>{props.forTask.body}</span>
                </div>
                
            </div>
        </div>
    )
}

export default Post;