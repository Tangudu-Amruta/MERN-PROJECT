import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [age,setAge] = useState(0);
  const [error,setError] = useState('');

  const {id} = useParams();

  const navigate = useNavigate();
   

  // const getSingleUser = async () => {
  //   const response = await fetch(`http://localhost:5000/update/${id}`);

  //   const result = await response.json();

  //   // const text = await response.text();
  //   // console.log('Response text:', text);

  //   // const result = JSON.parse(text);

  //   if(!response.ok){
  //     console.log(result.error)
  //     setError(result.error)
  //   }

  //   if(response.ok){
  //     setError("");

  //     console.log(result);

  //     // setName(result.name);
  //     // setEmail(result.email);
  //     // setAge(result.age);

  //   }
  // }

  // const getSingleUser = async () => {
  //   const response = await fetch(`http://localhost:5000/update/${id}`);
    
  //   const text = await response.text(); // Read the response as text
  //   console.log('Response text:', text); // Log the text to the console
    
  //   try {
  //     const result = JSON.parse(text); // Try parsing the text as JSON
  //     if (!response.ok) {
  //       console.log(result.error);
  //       setError(result.error);
  //     } else {
  //       setError('');
  //       console.log(result);
  //       // Set the form fields with the fetched data
  //       setName(result.name);
  //       setEmail(result.email);
  //       setAge(result.age);
  //     }
  //   } catch (err) {
  //     console.error('Failed to parse JSON:', err);
  //     setError('Failed to fetch user data');
  //   }
  // };


  //getting the single data
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    
    const text = await response.text(); // Read the response as text
    console.log('Response text:', text); // Log the text to the console
    
    try {
      const result = JSON.parse(text); // Try parsing the text as JSON
      if (!response.ok) {
        setError(result.error || 'Something went wrong');
      } else {
        setError('');
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (err) {
      console.error('Failed to parse JSON:', err);
      setError('Failed to fetch user data');
    }
  };
  

  //send the updated data to backend
  

  useEffect(()=>{
    getSingleUser();
  },[]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedUser = {name,email,age};
    const response = await fetch(`http://localhost:5000/${id}`,{
      method:"PATCH",
      body:JSON.stringify(updatedUser),
      headers : {
        "content-type" : "application/json",
      }
    });
    const result = await response.json();

    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      setError(" ")
      navigate('/all')
    }
  }

  return (
    <div className='container my-2'>
        {error && <div class="alert alert-danger">{error}</div>}
      <h2 className='text-center'>Edit The Data</h2>

        <form onSubmit={handleEdit}>
        <div className="mb-3">
      <label className="form-label">Name</label>
      <input type="text" className="form-control" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
       </div>
    <div className="mb-3">
      <label className="form-label">Email address</label>
      <input type="email" className="form-control" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Age</label>
      <input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/>
    </div>
    <button type="submit" className="btn btn-primary">Update</button>
  </form>
    </div>
  )
}

export default Update
