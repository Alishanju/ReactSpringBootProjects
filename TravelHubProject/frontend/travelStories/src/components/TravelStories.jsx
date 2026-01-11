import React, { Suspense, useEffect, useState } from 'react'
import GetAllTravels from './GetAllTravels'
import axios from 'axios';
import TravelCarousel from './TravelCarousel';
import TravelHubForm from './TravelHubForm';
import { toast } from 'react-toastify';


const initialFormState = {
  id: null,
  place: "",
  description: "",
  image: "",
  travelDate: ""
};

const TravelStories = () => {
 const API_URL = import.meta.env.VITE_API_URL;
  const [travelHubs,setTravelHubs]=useState([]);
  const [form,setForm]=useState(initialFormState);
  const [loading,setLoading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [deletingId,setDeleteId]=useState(null);


//GET
  const fetchAllHubs=async()=>{
    setLoading(true);
    try{
        const res=await axios.get(API_URL);
        //console.log(res.data);
        setTravelHubs(res.data);

    }catch(error){

        toast.error("Error in Fetching Travel Stories!")

    }finally{
        setLoading(false);
    
    }
  }


  useEffect(()=>{
    //fetchAllHubs();
    requestIdleCallback(() => fetchAllHubs());
  },[]);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm(prev=>({...prev,[name]:value}));

    
  }

  //POST & PUT
  const handleSave=async(e)=>{
    e.preventDefault();
 //console.log("SAVE CLICKED", form);
    const {id,place,description,image,travelDate}=form;
    if(!place || !description || !image || !travelDate){
      toast.warning("All fields are required");
      return;
    }
    setSaving(true);
    try{
      if(form.id){
        await axios.put(`${API_URL}/${form.id}`,form);
        toast.success("TravelStory updated successfully");
      }else{
        const { id, ...payload } = form; // 🔥 remove id
        //console.log("PAYLOAD SENT:", payload);
        await axios.post(`${API_URL}`,payload);
        toast.success("TravelStory created successfully");

      }
      await fetchAllHubs();
      setForm(initialFormState);

    }catch(err){
     // console.error("API ERROR:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to save TravelStory");

    }finally{
      setSaving(false);
    }
  }

  const handleEdit=(story)=>{
    setForm({
      id:story.id,
      place:story.place,
      description:story.description,
      image:story.image,
      travelDate:story.travelDate
    })
  }

  const handleDelete=async(id)=>{
    if(!window.confirm("Are you sure to delete this TravelStory?")) return;

    setDeleteId(id);
    try{
      await axios.delete(`${API_URL}/${id}`);
      toast.success("TravelStory deleted successfully");
      await fetchAllHubs();
    }catch(err){
      toast.success("Failed to Delete TravelStory");
    }finally{
      setDeleteId(null);
    }


  }



  if(loading){
    return <p className="text-center font-semibold font-2xl">Loading....</p>
  }


  return (
    <div>
        <h1 className='text-center text-3xl font-semibold text-lime-800 m-3 bg-red-200'>Miles & Memories</h1>
        {travelHubs.length > 0 && <TravelCarousel stories={travelHubs}/>}
        <p className="font-mono m-3 text-pink-400 font-medium text-center">Never hesitate to go far away, beyond all seas, all frontiers, all countries, all beliefs.</p>
      <TravelHubForm form={form} onChange={handleChange} onSave={handleSave} onCancel={()=>setForm(initialFormState)} saving={saving}/>
       <h1 className='m-3 mt-20 font-serif text-blue-500 text-center text-2xl'>My Wander Stories</h1>
       <GetAllTravels stories={travelHubs} onEdit={handleEdit} onDelete={handleDelete} deletingId={deletingId}/>
       
      
    </div>
  )
}

export default TravelStories
