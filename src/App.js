import {useEffect, useState} from 'react'
import './style.css';

import get_users from './utils/users_utils'
import get_posts  from './utils/posts_utils'
import get_todos from './utils/todos_utils'
import UsersComp from './components/Users/UsersComp'
import DetailsGeneral from './components/DetailsGeneral';


function App() {

  let[userData, setUserData]=useState([]);
  const[selectedUser,setSelectedUser]=useState(false);
  let [textSearch, setTextSearch]=useState('')
  const [isOpenNewUser,setIsOpenNewUser]=useState(false)
  const[selectUserID,setSelectUserID]=useState(0)

//--------------------------------------------------------------
  useEffect(async()=>
  {
    const users_list=  await get_users.get_users()  
    const posts_list=  await get_posts.get_posts();
    const todos_list=  await get_todos.get_todos();
   
    const maxTodosId= Math.max(...todos_list.map(t=> t.id) ,0)
    const maxPostsId= Math.max(...posts_list.map(t=> t.id) ,0)
    const maxUsersId= Math.max(...users_list.map(t=> t.id) ,0)
   
    let users_with_data=[]
     
    users_list.map(user=>
      {
        const getPosts= posts_list.filter(p=> p.userId===user.id)
        const getTodos= todos_list.filter(t=> t.userId===user.id)
        
       
        user ={...user, posts: getPosts ,todos: getTodos , isSearch: true, showDetails:false ,allTasksCompleted:false, genMaxTodos: maxTodosId, genMaxPosts:maxPostsId, genMaxUsers:maxUsersId}
        users_with_data.push(user)
      })
       setUserData(users_with_data)
         
    } ,[])


//--------------------------------------------------------------
   
    let arr=[];
    const fromUserComp2Update=(e)=>
     {    
      userData.map(user => {
        if (user.id==e.id)
        {
          user.name=e.name;
          user.email=e.email;
          user.address.street=e.street;
          user.address.city=e.city;
          user.address.zipcode=e.zipcode;
        }
        arr.push(user);

      })
      setUserData(arr)
    }

    //--------------------------------------------------------------
    let arr1=[];
    const delUser=(e)=>
    {  
      userData.map(user => {
        if (user.id!=e)
        {
          arr1.push(user);
        }
      })
      
      setUserData(arr1)
             
       // in order to close the task&Post window
       userData.forEach(user=>
        {
          user.showDetails=false;
        }
      )
       setSelectedUser(false)

    }
//--------------------------------------------------------------
      const whenSelectedID=(selectedUser)=>
      {
        setIsOpenNewUser(false);

        userData.forEach(user=>
          {
            user.showDetails=false;
          }
        )
          setUserData(userData)

        if (selectedUser !=0)
        {
          setSelectedUser(true)

          userData.forEach(user=>{
            if (user.id==selectedUser)
            {
              user.showDetails=true;  
              setSelectUserID(user.id)
            }
          })

          setUserData(userData)

        }
        else{
          setSelectedUser(false)
        }
        
      }

//--------------------------------------------------------------  
  let len_not_completed=0   
  const CompletedUpdateDB=(e)=>{
            
          userData.forEach(user=>
            {
              if (user.id==e.userId)
              {
                user.todos.forEach(todo=>
                  {
                    if (todo.id==e.task_id)
                    {
                      todo.completed=e.completed
                    }
                  })
                  len_not_completed=user.todos.filter(todo=> todo.completed==false)
                  if (len_not_completed.length==0)
                  {
                  user.allTasksCompleted=true
                  }
              }
            })
        
            setUserData(userData)
   
      }
//--------------------------------------------------------------
      const AddNewTask=(e)=>
      {      
        userData.forEach(user=>
            {
              if (user.id==e.userID)
              {
                (user.todos).push({userId:e.userID, id: e.GeneralMaxTodoId, title: e.inputTitle, completed: false})                
              }
              user.genMaxTodos=e.GeneralMaxTodoId
              user.allTasksCompleted=false
            })
         
            setUserData(userData)
      }

  //--------------------------------------------------------------
      const AddNewPost=(e)=>
      {
        userData.forEach(user=>
            {
              if (user.id==e.userID)
              {
                
                (user.posts).push({userId:e.userID, id: e.genMaxPostsId, title: e.inputTitle, body: e.inputBody})                
              }
              user.genMaxPosts=e.genMaxPostsId
            })
                                  
            setUserData(userData)
      }

//--------------------------------------------------------------
      const AddNewUser=(e)=>
      {    
        setIsOpenNewUser(!isOpenNewUser)
       
        var copyUserKeys = {};
        var new_user = {};
        for (var key in userData[0])
        {
          copyUserKeys[key] = userData[0][key];
          new_user[key]=''
        }
       
       new_user.name=e.inputName
       new_user.email=e.inputEmail
       new_user.isSearch=true
       new_user.address={street:'', city:'', zipcode:''}
       new_user.genMaxPosts=copyUserKeys.genMaxPosts
       new_user.genMaxTodos=copyUserKeys.genMaxTodos
       new_user.genMaxUsers=copyUserKeys.genMaxUsers
       new_user.allTasksCompleted=false
       new_user.id=copyUserKeys.genMaxUsers+1
       new_user.posts=[]
       new_user.todos=[]

       userData=[...userData,new_user]

        userData.forEach(user=>
          {
            user.genMaxUsers=copyUserKeys.genMaxUsers+1
          })

        setUserData(userData)
      }
//--------------------------------------------------------------
      const onSearchChangeHandler=(textSearch)=>
      {        
          // as the original users have isSerearch=true (for the initial upload) => 
          //we need to set flase all of them that are not needed to be search
          if (textSearch.length>0)
            {
              userData.forEach(usermap=>
              {
                  usermap.isSearch=true;
              })

              let not_match=[]  
              let match=[] 
                  
              //--not_matches to select text
              userData.filter(user=> 
                  !(user.name.toUpperCase().includes(textSearch.toUpperCase()))
                  && !(user.email.toUpperCase().includes(textSearch.toUpperCase()))).forEach(user1=>
                    {
                      user1.isSearch=false;
                      not_match.push(user1);
                    })

              // matched to select text
              userData.filter(user2=> 
                user2.name.toUpperCase().includes(textSearch.toUpperCase())
                || user2.email.toUpperCase().includes(textSearch.toUpperCase())).forEach(user3=>
                {
                  user3.isSearch=true;
                  match.push(user3);
                })
                
                setUserData([...match,...not_match].sort((a, b)=>{ return a.id - b.id;}))  
          }
          else{
            userData.forEach(usermap=>
              {
                  usermap.isSearch=true;
              })
          }
          
          setTextSearch(textSearch)
  }


  //---------------------------------------------------------------
  const AddOpenUser=()=>
  {
    userData.forEach(user=>
      {
        user.showDetails=false;
      }
    )
    setIsOpenNewUser(!isOpenNewUser)
    if (selectedUser)
    {
      setSelectedUser(false)
    }
  }

//--------------------------------------------------------

  const cancelOpenUser=()=>
  {
    setIsOpenNewUser(false)
  }
   //-------------------------------------------------------------- 
   
  return (
    <div className="App">
      <div className='startComp' >
           <div className='start-top'>
              <div className="startComp_search">
                Search: <input type="text" value= {textSearch} onChange={(e)=> onSearchChangeHandler(e.target.value)}/>
              </div>
    
               
              <div className="startComp_add">
                  <input type='button' value='Add' className='buttons'  onClick={AddOpenUser}/>  
              </div>       
           </div>
 
            {
               userData.map((item)=>
               { 
                                  
                  return (
                    <div key={item.id}>
                  {item.isSearch && <UsersComp key={item.id} user_data={item} compChangColor={item.allTasksCompleted} checkSelected={selectedUser} toCompSelectedID={selectUserID} onUpdate={fromUserComp2Update} onDelUser={delUser}   onSelectedID={whenSelectedID}/>}
                    </div>
                  ) 
               }) 
            }   

           
        </div>  
        <div className='startComp_details'>   
            < div >
                {
                  userData.map((item)=>
                  {                  
                    return(
                      <div key={item.id}>
                        { selectedUser && item.showDetails&& <DetailsGeneral users= {item} sectionName={'Todos'} onCompletedDB2={CompletedUpdateDB} addnewTodo={AddNewTask}/>}
                        <br/>
                        { selectedUser &&   item.showDetails&&<DetailsGeneral users={item}   sectionName={'Posts'} addnewPost={AddNewPost}/>}
                      </div>
                  )
                  })
                }
  
                <br/>        
                   {isOpenNewUser&& !selectedUser&& <DetailsGeneral users={userData}  cancelNewUser={cancelOpenUser} sectionName={'AddUser'} addnewUser={AddNewUser}/>}
            </div>        
        </div>
    </div>
  
  )
}

export default App;
