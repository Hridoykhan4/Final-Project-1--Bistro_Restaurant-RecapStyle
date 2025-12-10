import { useLocation, useNavigate } from "react-router-dom";
import useAuthValue from "../../hooks/useAuthValue";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe } = item;
  const { refetch } = useCart();

  const { user } = useAuthValue();
  const axiosSecure = useAxiosSecure();
  const nav = useNavigate();
  const location = useLocation();
  const handleAddToCart = (cart) => {
    if (user && user?.email) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add it!",
        customClass: {
          confirmButton:
            "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
          cancelButton:
            "bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 ml-2",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const item = {
            menuId: cart._id,
            name: cart.name,
            price: cart.price,
            image: cart?.image,
            email: user?.email,
          };
          const { data } = await axiosSecure.post("/carts", item);
          console.log(data);
          if (data?.insertedId) {
            Swal.fire({
              title: `Successfully placed Order: ${item?.name}`,
              timer: 1500,
              icon: "success",
            });
            refetch();
          }
        }
      });
    } else {
      Swal.fire({
        title: "Login First",
        timer: 1500,
        icon: "error",
      });
      nav("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div className="card relative bg-base-100  shadow-sm">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body ">
        <p className="absolute top-2 right-5 text-white font-semibold bg-black/30 backdrop-blur-2xl rounded p-1 ">
          ${price}
        </p>
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline border-0 border-b-4 mt-2 bg-slate-100"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
