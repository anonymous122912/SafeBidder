import { useEffect, useState } from "react";
import authservice from "../appwrite/auth.js";
import { Link } from "react-router";


function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await authservice.getCurrentUser();
      if (response) {
        setUser(response);
      }
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    await authservice.logout();
    setUser(null);
  };

  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <Link to="/" className="text-xl">
          SafeBidder
        </Link>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            {!user ? (
              <>
                <li>
                  <Link className="md:p-4 py-3 px-0 block hover:underline" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="md:p-4 py-3 px-0 block hover:underline" to="/signup">
                    SignUp
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    className="md:p-4 py-3 px-0 block hover:underline hover: cursor-pointer"
                    onClick={handleLogout}
                  >
                    LogOut
                  </a>
                </li>
                <li>
                  <Link className="md:p-4 py-3 px-0 block hover:underline" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
