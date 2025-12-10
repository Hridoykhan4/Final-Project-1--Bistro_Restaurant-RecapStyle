import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
const UpdateItem = () => {
  const { register, handleSubmit } = useForm();

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const nav = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    data: item = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/menu/${id}`);
      return data;
    },
    staleTime: 0,
  });

  const onSubmit = async ({ price, image, ...rest }) => {
    if (!image || image.length === 0) {
       alert('Select Image') 
      console.log("No image selected");
      return;
    }

    const imageFile = { image: image[0] };
    const { data: imgBBData } = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING_KEY
      }`,
      imageFile,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    console.log(imgBBData);

    if (imgBBData?.success) {
      try {
        const { data } = await axiosSecure.patch(`/menu/${id}`, {
          ...rest,
          price: parseFloat(price),
          image: imgBBData.data.display_url,
        });
        console.log(data);
        if (data?.modifiedCount) {
          Swal.fire({
            title: `${rest?.name} updated Successfully`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          refetch();
          nav(`/dashboard/manageItems`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <SectionTitle heading={"Update Item"} subHeading={"Wanna Change?"} />
      <div className="bg-[#F3F3F3] flex justify-center items-center mx-4 md:mx-12 p-4 md:p-12 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid md:grid-cols-2 gap-3"
        >
          <label className="form-control w-full md:col-span-2">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              defaultValue={item?.name}
              {...register("name")}
              type="text"
              className="input input-bordered w-full"
              placeholder="Recipe name"
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>
            <select
              defaultValue={item?.category}
              {...register("category")}
              className="input input-bordered w-full"
            >
              <option value="">select category</option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soups</option>
              <option value="dessert">Desserts</option>
              <option value="drinks">drinks</option>
              <option value="popular">Popular</option>
              <option value="offered">Offered</option>
            </select>
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Price*</span>
            </div>
            <input
              defaultValue={item?.price}
              {...register("price", { required: true })}
              type="text"
              className="input input-bordered w-full "
              placeholder="Price"
            />
          </label>
          <label className="form-control w-full md:col-span-2">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
              defaultValue={item?.recipe}
              contentEditable={false}
              {...register("recipe")}
              className="textarea textarea-bordered"
              placeholder="Recipe Details"
            ></textarea>
          </label>
          <label className="form-control w-full md:col-span-2 flex flex-row">
            <input
              {...register("image")}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className=" file-input-bordered w-full max-w-xs"
            />
            <img
              src={item?.image}
              alt={item?.name}
              className="w-14 h-14 object-cover rounded"
            />
          </label>

          <button
            type="submit"
            className="btn text-white bg-linear-to-r to-[#835D23] from-[#B58130] max-w-36"
          >
            Update Item
            <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
