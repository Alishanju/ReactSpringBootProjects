import { ToastContainer } from "react-toastify"
import TravelStories from "./components/TravelStories"


function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}/>
    <TravelStories />
    
   
    </>
  )
}

export default App
