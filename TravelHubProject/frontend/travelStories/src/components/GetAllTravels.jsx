import React from 'react'


const GetAllTravels = ({stories,onEdit,onDelete,deletingId}) => {

    if(stories.length === 0){
        return <p>No Stories Available!!</p>
    }
    const isMobile = window.innerWidth < 640;


  
  return (
    
    <div className='mx-auto flex flex-wrap items-center justify-center w-full'>
        {stories.map((story)=><div key={story.id} className='w-[530px] min-w-[230px] flex flex-col box-border items-center gap-2 p-4 border-2 text-center m-4'>
             <h3 className='text-lg text-purple-700 font-semibold'>{story.place}</h3>
            <img src={story.image} loading={isMobile ? "eager" : "lazy"} fetchpriority={isMobile ? "high" : "auto"} alt={story.place} className='rounded-sm object-cover w-[300px] h-[200px]'/>
            {/* <p>image link: {story.image}</p> */}
            <p className="w-[400px] max-sm:w-[300px] text-center box-border ">{story.description}</p>
            <p className='text-indigo-800'><b>Travel Date:</b> {story.travelDate} </p>
            <div className='flex justify-end w-[450px] max-sm:w-[300px]'>
              
            <button onClick={()=>onEdit(story)} className='bg-green-400 max-sm:float-none max-sm:m-1 max-sm:p-1 p-2 text-slate-50 rounded-md font-semibold  float-right mt-2 mr-4'>Edit</button>
            <button onClick={()=>onDelete(story.id)} className=" mt-2 p-1 max-sm:float-none max-sm:m-1 max-sm:p-1 float-right font-semibold border-2 rounded-md text-red-500">{deletingId===story.id ? "Deleting..." :"Delete"} </button>
            </div>
        </div>)}

      
    </div>
  
  )
}

export default GetAllTravels
