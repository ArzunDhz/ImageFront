import Googlebtn from "../assets/Google Button.png";
import Facebookbtn from "../assets/facebook Button.png";
import SeeIcon from "../assets/open.png";
import CloseIcon from "../assets/close.png";
import Tick from "../assets/tick.png";
import NotTick from "../assets/NotTick.png";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [rtoggle, rsetToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setAuth(false);
    setLoading(true);
    await axios
      .post(
        "https://dhz-image.onrender.com/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message), setAuth(true);
      })
      .catch((err) => toast.error(err.response.data.message));
    setLoading(false);
  };

  return (
    <>
      {auth ? (
        <Navigate to="/home" />
      ) : (
        <div className=" Regsiter bg-[#000A1A]  ">
          <div className="Container  flex justify-center items-center  mx-auto lg:w-[550px] md:w-[500px] w-full  h-full">
            <div className=" lg:mt-10">
              <form
                onSubmit={(e) => {
                  SubmitHandler(e);
                }}
                className="  lg:mt-[290px]  mt-[250px]   lg:w-[500px]  md:w-[400px] w-[320px] "
              >
                <div>
                  <div className="">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="Email"
                      name="password"
                      value={email}
                      placeholder="Email"
                      required
                      className=" indent-12   lg:h-[50px] md:h-[45px] h-[40px]  opacity-70  border-r-0 bg-sec-color  block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative mt-2">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      id="Password"
                      value={password}
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      type={toggle ? "text" : "password"}
                      required
                      className="mt-6 lg:h-[50px] md:h-[45px] h-[40px]  opacity-70 indent-16  border-r-0 bg-sec-color  block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <img
                      onClick={() =>
                        toggle ? setToggle(false) : setToggle(true)
                      }
                      src={toggle ? SeeIcon : CloseIcon}
                      id="toggler"
                      className="cursor-pointer "
                      alt=""
                    />
                  </div>
                </div>

                <div className=" mt-6  opacity-70 flex w-full lg:space-x-[280px]  md:space-x-[170px] space-x-[90px]  ">
                  <span className="flex text-white ">
                    <img
                      onClick={() =>
                        rtoggle ? rsetToggle(false) : rsetToggle(true)
                      }
                      src={rtoggle ? Tick : NotTick}
                      alt=""
                      className="w-3 h-3 mt-[2px]  mr-1"
                    />
                    <span className=" text-[11px]"> Remember Password </span>
                  </span>
                  <span className=" text-[11px]  text-white">
                    {" "}
                    Forgot Password ?
                  </span>
                </div>

                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className=" text-[16px] lg:h-[50px] md:h-[45px] h-[40px] mt-4 flex w-full justify-center rounded-md bg-pop-color  px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {loading ? (
                      <svg
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
                      </svg>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
                <div className="inline-flex items-center justify-center w-full ">
                  <hr className="w-full h-[5px] my-8 bg-gray-200  rounded-xl" />
                  <span className="absolute px-3 font-medium text-white bg-gray-900">
                    OR
                  </span>
                </div>
                <div className=" inline-flex items-center justify-center w-full lg:space-x-[130px]  md:space-x-[100px] space-x-[110px]  ">
                  <img
                    className=" lg:w-[150px] lg:h-[50px]  w-28"
                    src={Googlebtn}
                    alt=""
                  />
                  <img
                    className="  lg:w-[150px] lg:h-[50px] w-28"
                    src={Facebookbtn}
                    alt=""
                  />
                </div>

                <div className="  text-white text-sm  flex justify-center items-center w-full lg:space-x-[220px]  md:space-x-[120px] space-x-[110px]  ">
                  <span className=" opacity-70"> Regester New Account ? </span>
                  <Link className="underline text-pop-color" to={"/"}>
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
