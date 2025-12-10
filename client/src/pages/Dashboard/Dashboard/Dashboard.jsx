import { FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
const Dashboard = () => {
    const {cartItems} = useCart()
  const navLinkStyle = ({ isActive }) =>
    `font-medium tracking-wide ${
      isActive ? " border-green-500 border-b-4" : ""
    }`;

  const {isAdmin} = useAdmin();

  const adminPublicNavOptions = (
    <>
      {isAdmin ? (
        <>
          <li>
            <NavLink to="/dashboard/admin">Admin Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allUsers">All Users</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addItems">Add Items</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/dashboard/user">User Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">My Cart ({cartItems?.length})</NavLink>
          </li>
        </>
      )}
    </>
  );

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
    </>
  );
  return (
    <div>
      {/* Small Device */}
      <div className="drawer md:hidden text-right">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-3">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-1"
            className="text-xl font-semibold drawer-button"
          >
            <FaBars></FaBars>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {adminPublicNavOptions}
            <div className="divider"></div>
            {navOptions}
          </ul>
        </div>
      </div>

      <div className="flex gap-1">
        {/* Large Device */}

        <div className="w-72 md:h-screen hidden md:block bg-orange-600">
          <ul className="menu">
            {adminPublicNavOptions}
            <div className="divider"></div>
            {navOptions}
          </ul>
        </div>
        <div className="flex-1  p-4  w-full max-h-screen overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
