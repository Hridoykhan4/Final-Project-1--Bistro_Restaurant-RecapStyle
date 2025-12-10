import { useMemo } from "react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Cart = () => {
  const { cartItems, refetch } = useCart();
  const axiosSecure = useAxiosSecure();
  const totalCost = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.price, 0);
  }, [cartItems]);

  const handleDelete = async (id) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton:
            "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
          cancelButton:
            "bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 ml-2",
        },
        confirmButtonText: "Yes, delete it!",
      });
      if (!isConfirmed) return;
      if (isConfirmed) {
        const { data } = await axiosSecure.delete(`/carts/${id}`);
        if (data?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Successfully Deleted Item",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
          refetch();
        }
      }
    } catch (err) {
      console.log(err.message || err);
      Swal.fire({
        title: "Error",
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <div className="">
      <div>
        <SectionTitle
          heading="Wanna add More"
          subHeading="My Cart"
        ></SectionTitle>
      </div>
      <div className="sm:flex my-4 justify-evenly items-center">
        <h2>Items: {cartItems?.length}</h2>
        <h2>Total Price: {totalCost}</h2>

        {cartItems.length === 0 ? (
          <button
            disabled
            className="btn btn-primary  disabled:opacity-50
    disabled:cursor-not-allowed"
          >
            Pay
          </button>
        ) : (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        )}
      </div>
      <div className="">
        {cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ITEM IMAGE</th>
                  <th>ITEM NAME</th>
                  <th>PRICE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={item?._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={item?.image} />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{item?.name}</td>
                    <td>${item?.price}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn bg-[#B91C1C]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 6H5H21"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 11V17"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 11V17"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Items in the card</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
