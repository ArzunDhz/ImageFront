import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TokenIcon from "../assets/Token.png";
import EmailIcon from "../assets/Mail.png";
import IdIcon from "../assets/Idtag.png";
import resetIcon from "../assets/Reset.png";
import BinIcon from "../assets/bin.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Aboutme = () => {
  const [data, setData] = useState();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios
      .get("https://dhz-image.onrender.com/users/userinfo", { withCredentials: true })
      .then((res) => setData(res.data.user))
      .catch((err) => console.log(err.response.data.message));
  }, []);

  const conformation = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: "#070813",
      showCancelButton: true,
      confirmButtonColor: "#9916FF",
      cancelButtonColor: "#1B233E",
      confirmButtonText: "Conform",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(" https://dhz-image.onrender.com/users/deleteuser", {
            withCredentials: true,
          })
          .then ( async (res) => {
           await Swal.fire({
              title: "Success",
              text: res.data.message,
              icon: "success",
              background: "#070813",
              confirmButtonColor: "#9916FF",
            });
            setDeleted(true)
          })
          .catch((err) => toast.error('Some thing went wrong'));
      }
    });
  };

  return (
    <>
      {deleted ? (
        <>
          <Navigate to={"/"} />
        </>
      ) : (
        <>
          <div>
            <Navbar />
          </div>
          <h1 className="text-center text-white text-[29px]  mb-10">
            About me
          </h1>

          <div className="flex flex-col items-center pb-10">
            <div className="flex items-center justify-center w-20 h-20 mx-auto text-white rounded-full bg-pop-color">
              <h1>{data?.username.slice(0, 1).toUpperCase()}</h1>
            </div>
            <h5 className="mt-2 mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {data?.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Normal User
            </span>
            <div className=" mt-4 flex justify-center  items-center  bg-[#1B233E] border-[0.5px] border-pop-color  space-x-4  text-pop-color w-[150px] h-[50px] rounded-xl ml-5 ">
              <img src={TokenIcon} className="w-6 h-6 " alt="" />
              <h1 className="text-white "> {data?.token} </h1>
            </div>
            <h1 className=" flex  items-center rounded mt-4 h-[30px] w-[300px] text-[18px] text-white">
              {" "}
              <img src={EmailIcon} className="w-6 h-6 mr-6" alt="" />{" "}
              <p>{data?.email}</p>
            </h1>
            <h1 className=" flex rounded mt-3 h-[30px] w-[300px] text-[18px] text-white ">
              {" "}
              <img src={IdIcon} className="w-6 h-6 mr-6" alt="" />{" "}
              <p>{data?._id}</p>
            </h1>
            <Link to={"/reset"}>
              <button className=" flex  w-48 justify-center items-center h-10 mt-6 text-white bg-[#1B233E] rounded-xl">
                {" "}
                <img src={resetIcon} className="w-6 h-6 " />
                <p className="ml-3"> Reset Password</p>
              </button>
            </Link>
            <button
              onClick={() => conformation()}
              className="flex items-center justify-center w-48 h-10 mt-2 text-white bg-red-700 rounded-xl"
            >
              {" "}
              <img src={BinIcon} className="w-6 h-6 " />
              <p className="ml-3"> Delete Account</p>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Aboutme;
