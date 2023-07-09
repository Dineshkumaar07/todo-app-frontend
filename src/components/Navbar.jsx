import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="w-full h-max flex justify-around items-center text-lg  py-3 border-b-2 font-poppins z-1 sticky top-0 bg-white">
      <h1 className="font-bold  ">Task Management</h1>


      {!cookies.access_token ? (
        <>
          <Link
            to="/"
            className="text-black/60 hover:text-black duration-200"
          >
            Login/register
          </Link>
        </>
      ) : (
        <>
          
          <button onClick={logout} className="bg-purple-600 text-white sm:px-2 px-1 py-1 rounded-md font-bold ">Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
