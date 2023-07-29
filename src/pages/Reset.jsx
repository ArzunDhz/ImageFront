import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { Navigate, redirect } from "react-router-dom";

const Reset = () => {
  const [oldpassword, setPassword] = useState("");
  const [newpassword, nsetPassword] = useState("");
  const [reset,setReset] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async  (e)=>{
    e.preventDefault()

  await   Swal.fire({
        title: 'Are you sure?',
        text: "You want to reset the Password",
        icon: 'question',
        background:'#070813',
        showCancelButton: true,
        confirmButtonColor: '#9916FF',
        cancelButtonColor: '#1B233E',
        confirmButtonText: 'Conform'
      }).then((result) => {
        if (result.isConfirmed) {
        axios.put(' https://dhz-image.onrender.com/users/reset',{oldpassword,newpassword  },{withCredentials:true} )
            .then( async res => {  
              await  Swal.fire({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success',
                    background:'#070813',
                  })
                setReset(true)

            })
            .catch(err => toast.error(err.response.data.message) )
        }
      })


  }

  return (
    <>

{reset?
<>
<Navigate to={'/home'}/>
</>
:
<>



<div className=" z-[99999]">
        <Navbar />
      </div>

      <h1 className="text-[35px] text-center text-white ">Reset Password </h1>
      <form onSubmit={(e)=>handleSubmit(e)} className="flex justify-center ">
        <div className="mt-16">
          <div className="mt-6 ">
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="Password"
              value={oldpassword}
              name="password"
              placeholder="Old Password"
              autoComplete="current-password"
              type={toggle ? "text" : "password"}
              required
              className="mt-6 lg:h-[50px] md:h-[45px] h-[40px]  indent-16  border-r-0 bg-sec-color  block w-[350px] rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 ">
            <input
              onChange={(e) => nsetPassword(e.target.value)}
              id="Password"
              value={newpassword}
              name="password"
              placeholder="New Password"
              autoComplete="current-password"
              type={toggle ? "text" : "password"}
              required
              className="mt-6 lg:h-[50px] md:h-[45px] h-[40px]  indent-16  border-r-0 bg-sec-color  block w-[350px] rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-7">
            <input
              onClick={() => (toggle ? setToggle(false) : setToggle(true))}
              type="checkbox"
              name=""
              id=""
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-9 focus:bg-pop-color"
            />
            <label className=" text-red-50"> Show password </label>
          </div>
          <button className="mt-6  lg:h-[50px] md:h-[45px] h-[40px]   border-r-0 bg-pop-color   block w-[350px] rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <p className="text-xl ">Reset</p>
          </button>
        </div>
      </form>


</>
}

</>



  );
};

export default Reset;
