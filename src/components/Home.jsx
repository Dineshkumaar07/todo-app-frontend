import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [signUp, setSignUp] = useState(false);
  return (
    <div className="h-90v w-full flex items-center justify-center">
      {signUp ? (
        <Register signUp={signUp} setSignUp={setSignUp} />
      ) : (
        <Login signUp={signUp} setSignUp={setSignUp} />
      )}
    </div>
  );
};

const Register = ({ signUp, setSignUp }) => {
  
  const [message, setMessage] = useState("");
  const handleClick = async (data) => {
    const response = await axios.post(
      "http://localhost:4000/auth/register",
      data
    );
    setMessage(response.data.message);
    setSignUp(!signUp)
  };
  return (
    <div>
      <Form
        method="Already a user?"
        head="Register"
        signUp={signUp}
        setSignUp={setSignUp}
        handleClick={handleClick}
      />
    </div>
  );
};

const Login = ({ signUp, setSignUp }) => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleClick = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      navigate("/app");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Form
        method="New User"
        head="Login"
        signUp={signUp}
        setSignUp={setSignUp}
        handleClick={handleClick}
      />
    </div>
  );
};

const Form = ({ head, message, method, signUp, setSignUp, handleClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          handleClick(data);
        })}
        className="flex flex-col w-64"
      >
        <h1 className="font-bold text-xl mb-6">{head}</h1>
        <input
          {...register("username", { required: "this is required" })}
          type="text"
          placeholder="Username"
          className="rounded-sm px-1 py-1  focus:outline-none"
        />
        <p className="mb-1 text-red-600 sm:mb-3">{errors.username?.message}</p>
        <input
          {...register("password", { required: "this is required" })}
          type="password"
          placeholder="Password"
          className="rounded-sm px-1 py-1  mt-2 focus:outline-none"
        />
        <p className="mb-1 text-red-600 sm:mb-3">{errors.password?.message}</p>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="submit"
            className="w-28 cursor-pointer px-5 py-1 mt-9 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 duration-200 hover:drop-shadow-[0px_3px_20px_rgba(0,0,0,0.25)] hover:border-3"
          />
          <input
            className="w-fit  cursor-pointer px-5 py-1 mt-9 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600  duration-200 hover:drop-shadow-[0px_3px_20px_rgba(0,0,0,0.25)] hover:border-3"
            value={method}
            type="button"
            onClick={() => setSignUp(!signUp)}
          />
        </div>
      </form>
      <p className="text-red-600 mt-3">{message}</p>
    </div>
  );
};

export default Home;
