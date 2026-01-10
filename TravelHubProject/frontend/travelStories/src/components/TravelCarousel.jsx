import React,{useState,useEffect} from 'react'

const TravelCarousel = ({stories}) => {
    const [activeIdx,setActiveIdx]=useState(0);

    useEffect(()=>{
        const interval=setInterval(()=>{
             setActiveIdx(prev => (prev+1)%stories.length);

        },2000);

        return ()=>clearInterval(interval)
       

    },[])

  return (
    <div className='flex justify-center max-sm:hidden'>
       <img src={stories[activeIdx].image}
  alt={stories[activeIdx].place}
  className="rounded-md w-3/4 h-[400px] m-3"
  loading={activeIdx === 0 ? "eager" : "lazy"}
  fetchPriority={activeIdx === 0 ? "high" : "low"}
  decoding="async"
  width="1200"
  
  />
      
    </div>
  )
}

export default TravelCarousel
