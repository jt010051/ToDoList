import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

const List = () => {
const [lists, setLists] = useState([])
const getAllLists = async () =>{
    const listsInDatabase = await axios.get('lists/allLists')
    console.log(listsInDatabase);
    
        setLists(Object.entries(listsInDatabase.data)); 

}
useEffect(()=>{
getAllLists();
},[])


  return (
  <>
  
  {lists.map((list)=>{


return <div key = {list[0]}>

    {list[1].listName}
</div>;
  })}
  
  
  </>
  )
}

export default List