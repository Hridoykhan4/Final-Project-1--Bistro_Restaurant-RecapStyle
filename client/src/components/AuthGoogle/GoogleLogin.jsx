import Swal from "sweetalert2";
import useAuthValue from "../../hooks/useAuthValue";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLogin = ({ from }) => {
  const nav = useNavigate();
  const { googleLogin, setUser } = useAuthValue();
  const axiosPublic = useAxiosPublic()
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      if (result?.user) {
        const userInfo = { name: result?.user?.displayName, email: result.user?.email };
        const {data} = await axiosPublic.post('/users', userInfo);
        console.log(data);
        setUser({
          ...result?.user,
          photoURL: result?.user?.photoURL,
          displayName: result?.user?.displayName,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Successfully Login, Welcome ${result?.user?.displayName}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      nav(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-2">
      <div className="divider">OR</div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleGoogleLogin}
          className="btn bg-sky-600  text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
