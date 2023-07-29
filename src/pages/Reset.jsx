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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async  (e)=>{
    e.preventDefault()
    setLoading(true)
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

      setLoading(false)

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
            {loading?      <svg
                        aria-hidden="true"
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg> :<p className="text-xl ">Reset</p>    }
          </button>
        </div>
      </form>


</>
}

</>



  );
};

export default Reset;
