import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async ({ price, image, ...rest }) => {
    const imageFile = { image: image[0] };

    const { data: imgBBData } = await axiosPublic.post(
      image_hosting_api,
      imageFile,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    if (imgBBData?.success) {
      try {
        const { data } = await axiosSecure.post(`/menu`, {
          ...rest,
          price: parseFloat(price),
          image: imgBBData.data.display_url,
        });
        console.log(data, rest);
        if (data?.insertedId) {
          Swal.fire({
            title: `${rest?.name} added Successfully`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          reset();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div>
        <SectionTitle heading={"ADD AN ITEM"} subHeading={"What's new?"} />
      </div>
      <div className="bg-[#F3F3F3] mt-5 flex justify-center items-center mx-4 md:mx-12 p-4 md:p-12 rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid md:grid-cols-2 gap-3"
        >
          <label className="form-control w-full md:col-span-2">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              {...register("name", {
                required: `Must provide recipe name`,
                minLength: {
                  value: 2,
                  message: `Recipe name must be above 2 or more characters`,
                },
              })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Recipe name"
            />
            {errors?.name && (
              <span className="text-red-600 ">{errors?.name?.message}</span>
            )}
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Category*</span>
            </div>
            <select
              {...register("category", {
                required: `Must select the category`,
              })}
              className="input input-bordered w-full"
            >
              <option value="">select category</option>
              <option value="salad">SALAD</option>
              <option value="pizza">Pizza</option>
              <option value="soups">Soups</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">drinks</option>
            </select>
            <span className="text-red-600 ">{errors?.name?.message}</span>
            {errors?.category && (
              <span className="text-red-600 ">{errors?.category?.message}</span>
            )}
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Price*</span>
            </div>
            <input
              {...register("price", { required: true })}
              type="number"
              min={10}
              className="input input-bordered w-full "
              placeholder="Price"
            />
          </label>
          <label className="form-control w-full md:col-span-2">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <br />
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Recipe Details"
            ></textarea>
          </label>
          <label className="form-control w-full md:col-span-2">
            <input
              {...register("image", {
                required: `Image is required`,
                validate: {
                  checkFileType: (value) => {
                    const file = value[0];
                    if (!file) return `Image is required`;

                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ];
                    return (
                      allowedTypes.includes(file.type) ||
                      "Only JPG, PNG or WEBP images are allowed"
                    );
                  },
                },
              })}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </label>
          {errors?.image && (
            <span className="text-red-600 ">{errors?.image?.message}</span>
          )}

          <button
            disabled={errors?.image}
            type="submit"
            className="btn text-white disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed bg-linear-to-r to-[#835D23] from-[#B58130] max-w-36"
          >
            Add Item
            <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
