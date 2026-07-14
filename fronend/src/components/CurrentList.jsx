import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from '../api/axios'

const CurrentList = () => {
  const [list, setList] = useState({})
  const[itemId, setItemId] = useState(Infinity)
  const[listId, setListId] = useState(Infinity)
  const [isComplete, setIsComplete] = useState(() => new Map());
  const[completion, setCompleteion] = useState(false)
  const options = ['Edit', 'Up', 'Down', 'Delete'];
  const [itemEdit, setItemEdit] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [itemComplete, setItemComplete] = useState(false);
  const [listComplete, setListComplete] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [showItemForm, setShowItemForm] = useState(false);

  const retrieveList = async ()=>{

    const thisList = JSON.parse(localStorage.getItem('list'))[1];
    setList(JSON.parse(localStorage.getItem('list'))[1]) 
    setListComplete(thisList.listComplete);
    setListId(thisList.id)    
 
  }
  const handleEdit = (e) =>{
    setItemEdit(e.target.value)
  }
  const editDatabase = async () =>{
  // const response = axios.put(`lists/editItemInList/${listId}/${itemId}/item`)
  }
  const handleChange = (e) =>{
    setNewItem(e.target.value);
  }
  const handleSubmit = async(event)=>{
      event.preventDefault(); 
      const response = axios.post(`items/create/${newItem}/${listId}`)
      getListFromDatabase()
  }
  const getListFromDatabase= async ()=>{
      if(listId === Infinity) return
      const response = await axios.get(`lists/${listId}`)
      console.log(response.data);
      
      setList(response.data) 
      setListComplete(response.data.listComplete);
      setListId(response.data.id)    
      setNewItem('')
      setShowItemForm(false)
  }
  useEffect(()=>{
      returnList()
      getListFromDatabase()
  },[listId])

  useEffect(()=>{
      retrieveList();
  },[])

  const addOptions = (id) =>{
      setItemId(id);
  }

const doOption = async (option, i) =>{
      if(option === 'Edit')
        setShowEdit(!showEdit)

      if(option === 'Up'){
      
      }
      if(option === 'Down'){
      
      }
      if(option === 'Delete'){
      
      }
    }

  const handleComplete = async()=>{
      if(listId !== Infinity){ 
        const response = axios.put(`lists/setMarked/${itemId}/${listId}`)
        retrieveList();
      }
  }
  const returnList = () =>{
        if(list.length === 0) return
        let id = list.id
        let listComplete = list.listComplete
        let listName = list.listName
        let items = list.items

        // for (const [key, value] of Object.entries(Object.keys(list.itemComplete))) {
        // for (const [key2, value2] of Object.entries(value)) {
        // console.log(key, value);
        // }      
        // }

        return(
            <>
              <li>
              
                <h1>     
                  {listName} 
                  <input type="checkbox" id="subscribe" name="newsletter"/>
                </h1>

            { 
              items ?
                Object.entries(items).map((item)=>{
                    return(
                      <ul key = {item[1].id}>
                          {item[1].id === itemId 
                          ? <input type="checkbox" id="subscribe" 
                          name="newsletter" value={item[1]}/> 
                          : null
                          }
                          {item[1].itemName} 
                          {item[1].id === itemId  ? 
                            <div>
                              <ul>
                                {options.map((option, index, e) => {
                                    return (
                                      <div key={index}>
                                        <li>
                                          <Button onClick={() =>doOption(option, 
                                                                  item[1].itemName)}>                
                                                {option}
                                          </Button>
                                        </li>
                                        {
                                          showEdit && option === 'Edit' ? 
                                            <>
                                            <input type="text" name="username" 
                                              placeholder={item[1].itemName}
                                              onChange={handleEdit}/>
                          
                                            {showEdit && option ===  'Edit' ? 
                                                <Button onClick={editDatabase}>
                                                          Submit</Button>  
                                              : null}
                                              </>
                                            : null
                                        }
                                      </div>
                                      )

                                    } 
                                  )}
                          <label>
                              Complete : 
                                <input
                                  type="radio"
                                  name="completion"
                                  value="yes"
                                  checked={item[1].complete === true}
                                    onChange={handleComplete}
                                />
                                    yes
                          </label>

                          <label>
                                  <input
                                    type="radio"
                                    name="completion"
                                    value="no"
                                    checked={item[1].complete === false}
                                  onChange={handleComplete}
                                  />
                                  no
                          </label>
                        </ul>
                        </div>
                      : null
                    }
                    <Button onClick={(e)=>{
                      if(item[1].id === itemId)
                        setItemId(Infinity)
                      else
                        addOptions(item[1].id)
                      }}>
                        Options
                    </Button>
                </ul>
            )}) : null
            }
          </li>
    {
      !showItemForm ? 
            <Button onClick={() => setShowItemForm(true)}>
            Add New Item
          </Button>
          :
  <Button onClick={() => {
    setShowItemForm(false)
    setNewItem('')
  }}>
        Close
          </Button>
    }

          {
            showItemForm ?    
              <form onSubmit={handleSubmit}>
                    <label>
                      Name:
                        <input type="text" 
                          name="itemName" 
                          value={newItem}
                          onChange={handleChange}
                        />
                    </label>
                <Button type="submit">Submit</Button>
              </form>
            :null
          }
        </>
    )
  }


  return(
      <>
          {returnList()}
      </>
  )
  }

export default CurrentList