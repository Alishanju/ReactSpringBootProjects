import React from 'react'

const TravelHubForm = ({form,onChange,onSave,onCancel,saving}) => {
  return (
    <div className=' mx-auto w-[500px] min-w-[230px] max-sm:w-[450px] max-sm:flex-col max-sm:justify-center max-sm:items-center'>
        <h2 className='text-center text-yellow-950 text-xl font-semibold font-sans'>{form.id ? "Update" : "Create"} TravelStory</h2>
        <div>
        <input 
        name="place"
        placeholder='Place'
        value={form.place}
        onChange={onChange}
        className='border-2 p-1 w-full m-1 max-sm:w-[350px]'
        />
        <br />

        <textarea 
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
        className='border-2 p-1 w-full m-1 max-sm:w-[350px]'
        />
        <br />

        <input 
        name="image"
        type="text"
        placeholder='Image URL'
        value={form.image}
        onChange={onChange}
        className='border-2 p-1 w-full m-1 max-sm:w-[350px]'
        />
        <br />

        <input
        type="date"
        name="travelDate"
        placeholder='Travel Date'
        value={form.travelDate}
        onChange={onChange} 
        className='border-2 p-1 w-full m-1 max-sm:w-[350px]'
        />
        </div>
        {form.id && <button onClick={onCancel} className="mt-1  p-1  max-sm:float-none  max-sm:m-4 float-right font-semibold border-2 rounded-md text-red-500">Cancel</button>}

        <button onClick={onSave} className='bg-green-400 mr-4 max-sm:float-none p-1 text-slate-50 rounded-md font-semibold float-right mt-1' >{saving?"Saving...":form.id?"Update":"Create"}</button>

        
      
    </div>
  )
}

export default TravelHubForm
