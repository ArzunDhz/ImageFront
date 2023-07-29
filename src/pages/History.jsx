import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cross from '../assets/Close btn.png'
import { toast } from 'react-hot-toast'


const History = () => {

    const [change,setChange]= useState(false)
    const [data,setData]= useState()
    const [refreash, setRefresh] = useState()
    
    useEffect(()=>{
        axios.get(' https://dhz-image.onrender.com/image/getallimage', {withCredentials:true})
        .then( res => {setData(res.data)})
        .catch(err => console.log(err.response.data.message))

    },[refreash])
    
    const Fetchalldata= async ()=>{
      await axios.get('https://dhz-image.onrender.com/image/getallimage', {withCredentials:true})
      .then( res => {setData(res.data)})
      .catch(err => console.log(err.response.data.message))
   }
    
    if (!data) {
      return <div>Loading...</div>;
    }
    
    const deleteImage = async  (id)=>{
      setRefresh('ok')
      setChange(true)
      await axios.delete(` https://dhz-image.onrender.com/image/${id}`,{withCredentials:true})
      .then(res => toast.success(res.data.message))
      .catch(err => toast.error(err.response.data.message))
      setRefresh('noko')
      setChange(false)
    }



  
  return (
    <div  className="-mt-[16px] w-full h-screen bg-[#070813]" >
    <div ><Navbar/> </div> 
     {((data?.image.slice(0).reverse())).map( e =><div key={e._id}   className="lg:w-[612px]  w-[360px]  mx-auto text-white   ">
       <div className="ml-10 mb-2 rounded-lg lg:w-[600px] sm:w-[275px] lg:mt-20 mt-10 bg-slate-900">
       <button disabled={change} onClick={()=> {deleteImage(e._id)}} className='ml-[86%] lg:ml-[93%]'> <img  src={Cross} alt=""  />  </button>
       <img  loading='lazy' src={e.imageUrl}  className=" lg:w-full lg:h-full w-[275px] h-[263px] rounded-md " alt="" />
        <p className=' text-pop-color'>Text Prompt : <span className='text-white '>{e.imageDescription} </span> </p>
        <p className=' text-pop-color'>CreatedAt: <span className='text-white '>{e.createdAt} </span> </p>
       </div>
       
    </div>) 
    }
    </div>

  )
}

export default History