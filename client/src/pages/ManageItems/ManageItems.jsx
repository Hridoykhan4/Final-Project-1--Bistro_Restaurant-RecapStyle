import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMenu from "../../hooks/useMenu";

const ManageItems = () => {
  const { menu, refetch } = useMenu();
  const axiosSecure = useAxiosSecure();
  const handleDeleteMenu = async (id) => {
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
      buttonsStyling: false,
      confirmButtonText: "Yes, delete it!",
    });
    if (!isConfirmed) return;

    if (isConfirmed) {
      const { data } = await axiosSecure.delete(`/menu/${id}`);
      if (data?.deletedCount) {
        Swal.fire({
          title: "Removed!",
          text: "Successfully Removed",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        refetch();
      }
    }
  };

  return (
    <div>
      <div>
        <SectionTitle heading={"MANAGE ALL ITEMS"} subHeading={"Hurry Up!"} />
      </div>
      <div className="mt-5">
        <h2 className=" text-2xl font-medium">Total Items: {menu?.length}</h2>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM IMAGE</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>ACTION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                </td>
                <td>{item?.name}</td>
                <td className="text-right">{item?.price}</td>
                <th>
                  <Link
                    to={`/dashboard/updateItems/${item._id}`}
                    className="btn bg-[#D1A054]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDeleteMenu(item._id)}
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
    </div>
  );
};

export default ManageItems;
