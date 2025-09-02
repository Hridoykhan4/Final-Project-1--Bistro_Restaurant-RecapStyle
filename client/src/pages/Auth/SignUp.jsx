import { useForm } from "react-hook-form";
import registerImg from "../../assets/others/authentication2.png";
import useAuthValue from "../../hooks/useAuthValue";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/AuthGoogle/GoogleLogin";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";

const SignUp = () => {
  const { createUser, loading, setUser, user } = useAuthValue();
  const nav = useNavigate();
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

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await createUser(email, password);
      setUser({
        ...result?.user,
        photoURL: result?.user?.photoURL,
        displayName: result?.user?.displayName,
      });

      if (result?.user) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Successfully Signup, Welcome ${result?.user?.displayName}`,
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/");
      }
    } catch (err) {
      console.log(err);
    }
    reset();
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

                <input
                  value={loading ? "Sign up loading" : "Sign Up"}
                  type="submit"
                  className="btn btn-neutral w-full bg-sky-600 mt-4"
                />
              </fieldset>
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
