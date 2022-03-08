import axios from 'axios';

const get_posts=async ()=>
{
    let resp= await axios.get('https://jsonplaceholder.typicode.com/posts');
    return (resp.data)

}



export default {get_posts};