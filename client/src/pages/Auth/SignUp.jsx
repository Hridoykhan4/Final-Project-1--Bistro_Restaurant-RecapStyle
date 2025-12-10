import { useForm } from "react-hook-form";
import registerImg from "../../assets/others/authentication2.png";
import useAuthValue from "../../hooks/useAuthValue";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/AuthGoogle/GoogleLogin";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const { createUser, setUser, user, loading, updateUser } = useAuthValue();
  const nav = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user, nav]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!selected?.type?.startsWith("image/"))
      return Swal.fire({
        icon: "error",
        title: "Please upload a valid image file (JPG, PNG, etc.)",
        timer: 1200,
      });
    if (selected?.size > 2 * 1024 * 1024)
      return Swal.fire({
        icon: "error",
        title: "Image must be under 2MB",
        timer: 1200,
      });

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const onSubmit = async (data) => {
    const { email, password, name } = data;
    if (!file) {
      return Swal.fire({
        icon: "error",
        title: "Please upload a profile picture",
      });
    }

    try {
      setUploading(true);
      const { data: imgBBData } = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        { image: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imgBBData?.success) {
        const { user } = await createUser(email, password);

        setUser({
          ...user,
          displayName: name,
          photoURL: imgBBData?.data?.display_url,
        });
        await updateUser(name, imgBBData?.data?.display_url);
        const { data } = await axiosPublic.post("/users", {
          name: name,
          email: user?.email,
        });
   
        if (data?.insertedId) {
          Swal.fire({
            timer: 2000,
            title: `Welcome ${name}`,
            icon: 'success'
          });
          reset();
          nav("/");
        }
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
            timer: 2000,
            title: `${err?.message}`,
            icon: 'error'
          });
    } finally {
      setUploading(false);
    }
  };
  if (user) return <Navigate to="/"></Navigate>;
  if (loading) return <Spinner></Spinner>;
  return (
    <section>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center hidden sm:flex sm:w-1/2 lg:text-left">
            <img src={registerImg} alt="" />
          </div>
          <div className="card bg-base-100 sm:w-1/2 w-full max-w-md shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  {...register("name", {
                    required: `Name should be filled`,
                    minLength: {
                      value: 3,
                      message:
                        "Name must be greater or equal to three characters",
                    },
                  })}
                  type="text"
                  className="input w-full border border-black/50"
                  placeholder="Enter Name"
                />
                {errors?.name && (
                  <small className="text-red-600 text-xs">
                    {errors?.name?.message}
                  </small>
                )}
                <label className="label">Email</label>

                <input
                  {...register("email", {
                    required: `Email should be filled`,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  className="input w-full border border-black/50"
                  placeholder="Email"
                />
                {errors?.email && (
                  <small className="text-red-600 text-xs">
                    {errors?.email?.message}
                  </small>
                )}
                <label className="label">Password</label>
                <input
                  {...register("password", {
                    required: "Password must be filled",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or longer",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password should not exceeds 20 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and be 6+ characters long",
                    },
                  })}
                  type="password"
                  className="input w-full border border-black/50"
                  placeholder="Password"
                />
                {errors?.password && (
                  <small className="text-red-600 text-xs">
                    {errors?.password?.message}
                  </small>
                )}

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Pick Photo</legend>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    className="file-input"
                    accept="image/*"
                  />
                  <label className="label">
                    {uploading ? "Uploading .... " : "Max size 2MB"}
                  </label>
                </fieldset>

                <input
                  disabled={!file}
                  value={loading ? "Sign up loading" : "Sign Up"}
                  type="submit"
                  className="btn btn-neutral w-full bg-sky-600 mt-4"
                />
              </fieldset>
              {preview && (
                <div className="flex justify-center pb-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 rounded-lg object-cover border border-gray-200 shadow-md"
                  />
                </div>
              )}
            </form>
            <GoogleLogin></GoogleLogin>
            <div className="text-center flex items-center justify-center gap-2 pb-4">
              <p>Already have an account?</p>
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
