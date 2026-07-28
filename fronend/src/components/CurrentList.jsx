import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from '../api/axios'

const CurrentList = () => {
      const [list, setList] = useState({})
      const[itemId, setItemId] = useState(Infinity)
      const[listId, setListId] = useState(Infinity)
      const options = ['Edit', 'Up', 'Down', 'Delete'];
      const [itemEdit, setItemEdit] = useState(false)
      const [listComplete, setListComplete] = useState(false);
      const [showItemForm, setShowItemForm] = useState(false);
      const [item, setItem] = useState('')
      const [thisItem, setThisItem] = useState({});

      const retrieveList = async (event)=>{
        try{
        // event.preventDefault()
        const thisList = JSON.parse(localStorage.getItem('list'))[1];
        setList(JSON.parse(localStorage.getItem('list'))[1]) 
        setListComplete(thisList.listComplete);
        setListId(thisList.id)  
        }  
           catch(e){
            console.log(e);
            
          } 
      }

   

      const editItem = async (event) =>{
        console.log(thisItem); 
        
        try{    
            event.preventDefault()
            const response = axios.put(`items/edit/${listId}`, thisItem)
            getListFromDatabase();
            setThisItem({})
            setItemId(Infinity)
            setItemEdit(false)
            setShowItemForm(false)
            setItem('')
            console.log(response);  
        }
        catch(e){
          console.log(e);  
        }
      }

      const handleChange = (e) =>{
        console.log(e.target.value);
        
        const { name, value } = e.target;
            setThisItem(prevItem => ({
            ...prevItem,      
            [name]: value       
          }));      
      }

      const handleSubmit = async(event)=>{
          event.preventDefault(); 
          try{
          const response = axios.post(`items/create/${thisItem.itemName}/${listId}`)
     
            getListFromDatabase()
            setThisItem({})
            setItemId(Infinity)
            setItemEdit(false)
            setShowItemForm(false)
            setItem('')
          }
          catch(e){
            console.log(e);
            
          }
      }

      const getListFromDatabase= async ()=>{
          if(listId === Infinity) return
            try{
          const response = await axios.get(`lists/${listId}`)    
          setList(response.data) 
          setListComplete(response.data.listComplete);
          setListId(response.data.id)    
          setItem('')
          setShowItemForm(false)
            }
               catch(e){
            console.log(e);
            
          }
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
            setItemEdit(!itemEdit)
          if(option === 'Up'){
          
          }
          if(option === 'Down'){
          
          }
          if(option === 'Delete'){
          
          }
        }

      const handleComplete = async()=>{
          if(listId !== Infinity){ 
            try{
            const response = axios.put(`lists/setMarked/${itemId}/${listId}`)
            getListFromDatabase();
            }
               catch(e){
            console.log(e);
            
          }
          }
      }
useEffect(()=>{
console.log(thisItem.itemName);

},[thisItem])
      const returnList = () =>{
            if(list.length === 0) return
            let id = list.id
            let listComplete = list.listComplete
            let listName = list.listName
            let items = list.items
            
            return(
                    <>
                      <li>
                      
                        <h1>     
                          {listName} 
                          <input type="checkbox" id="subscribe" name="newsletter"/>
                        </h1>

                    { 
                      items ?
                        Object.entries(items).map((i)=>{
                            return(
                              <ul key = {i[1].id}>
                                  {i[1].id === itemId 
                                  ? <input type="checkbox" id="subscribe" 
                                  name="newsletter" value={i[1]}/> 
                                  : null
                                  }
                                  {i[1].itemName} 
                                  {i[1].id === itemId  ? 
                                    <div>
                                      <ul>
                                        {options.map((option, index, e) => {
                                            return (
                                              <div key={index}>
                                                <li>
                                                  <Button 
                                                  type='button'
                                                  onClick={() =>{
                                                    doOption(option, i[1].itemName)
                                                  }}>                
                                                        {option}
                                                  </Button>
                                                </li>
                                                {
                                                  itemEdit && option === 'Edit' ? 
                                                    <>
                                                    <input type="text" name="itemName"                        
                                                        value={thisItem.itemName}
                                                        onChange={handleChange}/>

                                                    {itemEdit && option ===  'Edit' ? 
                                                        <Button onClick={editItem}
                                                        type='button'
                                                        >
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
                                          checked={i[1].complete === true}
                                          onChange={handleComplete}
                                        />
                                            yes
                                  </label>
                                  <label>
                                          <input
                                            type="radio"
                                            name="completion"
                                            value="no"
                                            checked={i[1].complete === false}
                                            onChange={handleComplete}
                                            />
                                          no
                                  </label>
                                </ul>
                              </div>
                            : null
                          }
                        <Button 
                        type='button'
                        onClick={(e)=>{
                          setThisItem(i[1])
                          if(i[1].id === itemId)
                            setItemId(Infinity)
                          else
                            addOptions(i[1].id)
                          if(itemEdit)
                            setItemEdit(!itemEdit)
                          }}>
                              Options
                          </Button>
                      </ul>
                  )}) : null
                }
            </li>
            {
              !showItemForm ? 
                    <Button 
                    type='button'
                    onClick={() => setShowItemForm(true)}>
                      Add New Item
                    </Button>
                  :
                  <Button onClick={() => {
                    setShowItemForm(false)
                    setItem('')                    
                  }}
                  type='button'
                  >
                        Close
                  </Button>
            }
            {
                showItemForm ?    
                  <form onSubmit={handleSubmit}>
                      <label>
                          Name:
                            <input 
                            id='itemName'
                                  type="text" 
                                    name="itemName" 
                                    value={thisItem.itemName}
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