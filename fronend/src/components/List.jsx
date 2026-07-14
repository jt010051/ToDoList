import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import CurrentList from './CurrentList'
import { Button } from 'react-bootstrap'

  const List = () => {
    const [lists, setLists] = useState([])
    const [currentList, setCurrentList] = useState({})
    const [createList, setCreateList] = useState(false)
    const [editList, setEditList] = useState(false)
    const [listName, setListName] = useState('');
    const [deleteList, setDeleteList] = useState(false)
    const getAllLists = async () =>{
      localStorage.removeItem('list') 
      const listsInDatabase = await axios.get('lists/allLists')
      setLists(Object.entries(listsInDatabase.data));      
    }

    const handleChange = (e) =>{
      const { name, value } = e.target;
      setListName(e.target.value)
      const updateName = () => {
        setCurrentList(prevList => ({
          ...prevList,      
          [name]: value       
        }));
       
        
};
 console.log(value);
    }

    const handleEditList = async(e) =>{  
      console.log(currentList);
      
      try{
        e.preventDefault()
        const response = await axios.put('lists/edit', currentList)
        console.log(response);
        setListName('')
        getAllLists()
      }
      catch(e){
        console.log(e);
        
      }
    }

    const handleSubmit = async (error) =>{
      try{
        const response = await axios.post(`lists/create/${listName}`)
        setListName('')
        getAllLists()
      }
      catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
      getAllLists();
    },[])
useEffect(()=>{
  console.log(currentList);
  
},[currentList])

      return (
        <>
            <ul>
                {lists.map((list)=>{    
                                  
                  return(
                      <div key = {list[1].id}>
                        <li>
                          <Link to='cList' 
                            onClick={() => localStorage.setItem('list', 
                              JSON.stringify(list))}> 
                                {list[1].listName}
                            </Link>       
                            {editList 
                            && currentList === list[1]
                            ? 
                             <div>
                          <h1>Edit List</h1>
                            <form onSubmit={handleEditList}>
                              <div>
                                <label htmlFor="listName">Name:</label>
                                  <input id="listName" name="listName" type="text"  
                                    value={currentList.listName}
                                    onChange={handleChange}/>
                              </div>
                              <Button type="submit">Submit</Button>
                            </form>
                        <div>
                          <Button onClick={() => {
                            setEditList(false)
                            setListName('')
                            setCurrentList([])
                          }}>Cancel</Button>
                        </div>
                      </div> 
                            :
                             <Button onClick={()=> {
                              setEditList(true)
                              setCreateList(false)
                              setDeleteList(false)
                              setListName(list[1].listName)
                               setCurrentList(list[1])  
                             }}>Edit List</Button>   

                            }
                            <Button>Delete List</Button> 
                        </li>
                    </div>
                  )
                  
                 
                }
                )
                }
                {
                  createList ? 
                      <div>
                          <h1>Create New List</h1>
                            <form onSubmit={handleSubmit}>
                              <div>
                                <label htmlFor="listName">Name:</label>
                                  <input id="listName" name="listName" type="text"  
                                    value={listName}
                                    onChange={handleChange}/>
                              </div>
                              <Button type="submit">Submit</Button>
                            </form>
                        <div>
                          <Button onClick={() => {
                              setCreateList(false)
                              setListName('')
                          }}>Cancel</Button>
                        </div>
                      </div> 
                  : <Button onClick={() => {
                              setEditList(false)
                              setCreateList(true)
                              setDeleteList(false)
                              setListName('')
                  }}>Create New List</Button>
                }
          </ul>
        </>
      )
  }

  export default List