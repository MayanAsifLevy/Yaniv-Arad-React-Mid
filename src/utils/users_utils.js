import axios from 'axios';

const get_users= async ()=>
{
    let resp=await axios.get('https://jsonplaceholder.typicode.com/users')
      return (resp.data)
  
}



export default {get_users};