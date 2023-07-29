import Navbar from "../components/Navbar";
import TokenIcon from "../assets/Token.png";
import useUserStore from "../store/store";
import  {useEffect, useState } from 'react'
import axios from "axios";
import { toast } from "react-hot-toast";


const Home = () => {
   const userData = useUserStore((state)=>state.user)
   const getUserFromapi = useUserStore((state)=>state.userLogin)
   const [input,setInput]= useState('')
   const [image,setImage]= useState()
   const [Loading,setLoading]= useState(false)
   
   useEffect(()=>{
    getUserFromapi()
   },[image])

    const HandelSubmit = async  ()=>{
      setLoading(true)
    await axios.post('https://dhz-image.onrender.com/image/generate',{imageDescription:input},{
         withCredentials: true,
         headers: {
           "Content-Type": "application/json",
         }
        })
     .then(res => setImage(res.data.image.imageUrl)).catch(err => toast.error(err.response.data.message , {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    } ))
     setLoading(false)
   }


  return (
    <div id="Home" className=" bg-main-color">
      <Navbar />

      <div className=" lg:ml-40  flex justify-center  items-center  bg-[#121425] border-[0.5px] border-pop-color  space-x-4  text-pop-color w-[100px] h-[50px] rounded-xl ml-5 ">
        <h1 className="text-white "> {userData?.token} </h1>
        <img src={TokenIcon} className="w-6 h-6 " alt="" />
      </div>
      <form   onSubmit={()=>HandelSubmit()} className="flex flex-col items-center justify-center mt-10 lg:mt-20">
        <input
          value={input}
          type="text"
          disabled={Loading}
          onChange={(e)=>setInput(e.target.value)}
          className=" indent-5 bg-[#121425]   text-white  lg:w-[50%] md:w-[65%] w-[90%] lg:h-14  md:h-10 rounded h-[58px] "
        />
        <button  disabled={Loading} onClick={HandelSubmit} className=" lg:hidden mt-2 lg:w-[50%] md:w-[65%] w-[90%] lg:h-14  md:h-10 bg-[#121425]  text-pop-color border-2 border-pop-color rounded h-[58px]   ">
          Generate
        </button>
      </form>

      <div className="flex justify-center ">
   {Loading?<>   
    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 mt-28 animate-spin dark:text-gray-600 fill-pop-color" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>  
</>:<>
{image?<img src={image} className=" rounded  lg:mt-14 lg:w-[600px] lg:h-[550px] md:w-[400px]  mt-6  w-[300px] " alt="" />:'...' }

</>}
    
    
      </div>
    </div>
  );
};

export default Home;
