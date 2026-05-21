import React, { useEffect, useState, useRef } from 'react'
import axios from '../api/axios'
import { Fragment } from 'react';
import { Button } from 'react-bootstrap';
const Item = () => {
    const wrapperRef = useRef(null);

  const[items, setItems] = useState([])
  const[popUp, setPopUp] = useState(false)
  const[thisItem, setThisItem] = useState('')
  const [selectedValues, setSelectedValues] = useState([]);
    const [value, setValue] = useState('');
    const [editItem, setEditItem] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);
        const [editedValue, setEditedValue] = useState('');

const resetOptions = () =>{
  setEditItem(false)
  setDeleteItem(false)
 
}
const submitChange = async () =>{
  console.log(editedValue);
  console.log(value);
  
  
        const response = await axios.put(`/items/editItem/${editedValue}/${value}`)
        console.log(response);
        displayFullList()
         resetOptions()
}
  const displayFullList = async () => {
    try{
               const userList = await axios.get('/items/allItems')
              setItems(Object.entries(userList.data)); 
         
          
              
    }
      catch (err) {
            console.log(err);           
        }

}
const handleDelete = async () =>{
    try{

      
      const resonse = await axios.delete(`/items/delete/${value}`)
      console.log(resonse);
      
          
              
    }
      catch (err) {
            console.log(err);           
        }

}

const handleSubmit = async () =>{
  try{

    const response = await axios.post(`/items/create/${thisItem}`)
    console.log(response);
    
  }
  
   catch (err) {
            console.log(err);           
        }
}
 const handleChange = (e) => {
  const { value, checked } = e.target;
    
    if (checked) {
      // Add the value to the array if checked
      setSelectedValues([...selectedValues, value]);
    } else {
      // Remove the value from the array if unchecked
      setSelectedValues(selectedValues.filter((v) => v !== value));
    }
  };
  useEffect(()=>{
         displayFullList()
  },[])

const handleClickOutside =(e)=>{
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
  setValue('')
        }
}
      document.addEventListener("mousedown", handleClickOutside);


  return (
  <>
  <h1>To Do List</h1>

 <ul ref={wrapperRef}>
 


   {
    items.map((item) =>{
    return (
    < div className="form-check" key={item[0]}>
  <input className="form-check-input" type="checkbox" value={item[1].itemName} id="flexCheckDefault"
  onChange={handleChange}/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
    {item[1].itemName}
         {value  && item[1].itemName === value ? 
    <>
    <Button onClick={()=>{
      resetOptions()
      setEditItem(true)
      setEditedValue(value)
    }} disabled = {editItem ? true : false}>Edit</Button>
    <Button onClick={()=>{
      resetOptions()
      setDeleteItem(true)
      handleDelete()
    }} >Delete</Button>
    </>   
     : null}
     </label>
     <Button onClick={(e)=>{
      setValue(item[1].itemName)
      resetOptions()
     }} 
      disabled = {value ==  item[1].itemName? true : false}>More Options</Button>
      {item[1].itemName === value && editItem ? 
      <div>
      <input type="text" value={editedValue}
      onChange={(e) => setEditedValue(e.target.value)} />
      <Button onClick={submitChange}>Submit</Button>
      </div>
      
      :null}
</div>

    )
  })
}
 

      
    

 </ul>
  <button type="button" className="btn btn-primary btn-lg"
  onClick={()=> setPopUp(!popUp)}>Add to List</button>
{popUp ? 
<form onSubmit={handleSubmit}>
      <label>Add New Item:
        <input 
               type="text" 
          value={thisItem}
          onChange={(e) => setThisItem(e.target.value)} // Updates state on every keystroke
        
        />
      </label>
      <input type="submit" />
    </form>
    : null

}
  </>
  )
}

export default Item