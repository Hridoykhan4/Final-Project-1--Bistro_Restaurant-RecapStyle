import { NavLink } from "react-router-dom";
import useAuthValue from "../../../hooks/useAuthValue";
import Swal from "sweetalert2";
const NavBar = () => {
  const { user, logOut } = useAuthValue();
  console.log(user);
  const navLinkStyle = ({ isActive }) =>
    `font-medium tracking-wide ${
      isActive ? " border-green-500 border-b-4" : ""
    }`;
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
        cancelButton:
          "bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 ml-2",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Logged out!",
            text: "You have been successfully logged out.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            timer: 1500,
          });
        });
      }
    });
  };

  const navOptions = (
    <>
      <li>
        <NavLink className={navLinkStyle} to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkStyle} to="/menu">
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkStyle} to="/order/salad">
          Order Food
        </NavLink>
      </li>
      {user ? (
        <>
          <li className="">
            <button
              onClick={handleLogout}
              className="font-medium text-white btn btn-sm self-center tracking-wide "
            >
              Log out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink className={navLinkStyle} to="/login">
              Login
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 backdrop-blur-2xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu space-y-1  menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-black/80 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center  justify-center items-center ms-auto hidden lg:flex">
          <ul className="menu space-x-4 menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
