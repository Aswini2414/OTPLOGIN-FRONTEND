import { useState, React } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userVerify } from '../services/api';

const Otp = () => {
  const [otp, setOtp] = useState(" ");
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    if(otp === "") {
      toast.error("Enter your OTP");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter valid OTP!");
    } else if (otp.length < 6) {
      toast.error("OTP should be minimum of 6 digits");
    } else {
      const data = {otp, email: location.state};
      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      } else {
        toast.error(response.response.data.error);
      }
    }
  }

  return (
    <>
      <section className="otp-sec">
        <div>
          <h1>Please Enter Your OTP Here</h1>
          <form className="form otp-form">
            <label>OTP</label>
            <input
              type="text"
              id="otp-input"
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn" onClick={(e) => LoginUser(e)}>
              Submit
            </button>
          </form>
        </div>
      </section>
      <ToastContainer className="toast" />
    </>
  );
}

export default Otp;