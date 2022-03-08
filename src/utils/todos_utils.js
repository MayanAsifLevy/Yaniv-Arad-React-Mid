import axios from 'axios';

const get_todos=async ()=>
{
   let resp= await axios.get('https://jsonplaceholder.typicode.com/todos');
   return (resp.data)

}



export default {get_todos};