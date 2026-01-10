import { useEffect, useState } from 'react'
import './App.css'
import StudentList from './components/StudentList';

function App() {

  const [students,setStudents]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  

  useEffect(()=>{
  const fetchStudents=async()=>{
   try{
    setLoading(true);
    
    const data=await fetch("http://localhost:8080/students");
    if(!data.ok){
      throw new Error("Error initially...")
    }
    const res=await data.json();
  
    setStudents(res);

  }catch(error){
    setError(error.message)
    
  }finally{
    
    setLoading(false);
  }
}

  fetchStudents(); 
},[])

if(error){
  return <p>Error Occured:{error}</p>
}
if(loading){
  return <p>Loading...</p>
}

 

  return (
    <>
    <h1>Students List Api</h1>
    <div className="outer">
    {students.map(item => 
      <StudentList key={item.id} name={item.name} email={item.email} image={item.image}/>
      )}
    

    </div>
    </>
  )
}

export default App
