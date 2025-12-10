import { useForm } from "react-hook-form";
import loginImg from "../../assets/others/authentication1.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import useAuthValue from "../../hooks/useAuthValue";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/AuthGoogle/GoogleLogin";
import Spinner from "../../components/Spinner/Spinner";

// const sitekey = import.meta.env.VITE_Recapcha_Site_key
const Login = () => {
  const nav = useNavigate();
  const { signUser, user, loading } = useAuthValue();
  const [captchaValue, setCaptchaValue] = useState(null);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
console.log(from, loading);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  useEffect(() => {
    if (user) {
      nav(from, { replace: true });
    }
  }, [user, from, nav]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (!captchaValue) {
      return "";
    }
    const { email, password } = data;
    try {
      const result = await signUser(email, password);
      if (result?.user) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Successfully Login, Welcome ${result?.user?.displayName}`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) return <Spinner></Spinner>;
  if (user) return <Spinner></Spinner>;
  return (
    <section>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center hidden sm:flex sm:w-1/2 lg:text-left">
            <img src={loginImg} alt="" />
          </div>
          <div className="card bg-base-100 sm:w-1/2 w-full max-w-md shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
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
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_Recapcha_Site_key}
                  onChange={handleCaptchaChange}
                />
                <input
                  disabled={!captchaValue}
                  value="Login"
                  type="submit"
                  className="btn btn-neutral w-full bg-sky-600 mt-4"
                />
              </fieldset>
            </form>

            <GoogleLogin from={from}></GoogleLogin>

            <div className="text-center flex items-center justify-center gap-2 pb-4">
              <p>New to this site?</p>
              <Link to="/signUp" className="link link-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
