import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (email === "" || password === "" || name === "") {
      alert("All fields are required.");
      return;
    }

    console.log(`${email} ${password} ${name}`);
    try {
      await authService.createAccount({ email, password, name });
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center p-4 dark:bg-slate-800">
      <div className="bg-white p-6 shadow-lg rounded-xl w-96 ">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl text-blue-800 font-bold capitalize text-center mb-4">
            <h3>Create a new Account!</h3>
          </div>
          <div>
            <div className="capitalize text-xl mb-2">
              <label htmlFor="name">Name</label>
            </div>
            <div className="border-2 relative">
              <input
                id="name"
                className="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="capitalize text-xl mb-2">
              <label htmlFor="email">Email</label>
            </div>
            <div className="border-2 relative">
              <input
                id="email"
                className="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="capitalize text-xl mb-2">
              <label htmlFor="password">Password</label>
            </div>
            <div className="border-2 relative">
              <input
                id="password"
                className="w-full placeholder:capitalize px-8 py-1.5 outline-blue-800"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          <div className="sm:flex sm:justify-between inline-block my-4">
            <div className="flex items-center">
              <input id="rememberMe" className="text-blue-800" type="checkbox" />
              <label htmlFor="rememberMe" className="pl-1">
                Remember me
              </label>
            </div>
            <div className="text-blue-800 hover:underline">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-800 text-xl text-white font-medium uppercase p-2 rounded-lg w-full opacity-90 hover:opacity-100"
            >
              Create Account
            </button>
          </div>
          <div className="text-[18px] text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="capitalize text-blue-800 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
