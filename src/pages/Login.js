import {useState, React } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { sendOtpFunction } from '../services/api.js';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState({});
  
  const navigate = useNavigate();
  
  const sendOtp = async (e) => {
    e.preventDefault();
    if (email.email === " ") {
      toast.error("Enter your email!");
    } else if (!email.email.includes("@")) {
      toast.error("Enter valid email!");
    } else {
      const response = await sendOtpFunction(email);
      if (response.status === 200) {
        navigate("/user/otp", { state: email.email });
      } else {
        toast.error("Login Unsuccessful");
      }
    }
  };

    return (
      <section className="registerContainer">
        <div className="reg-form login-form">
          <h1>Sign In</h1>
          <p>Already have account?</p>
          <form className="form">
            <input type="text" name="email" onChange={(e) => setEmail({ "email": e.target.value })} placeholder="Email" />
            <button onClick={(e) => sendOtp(e)} className="btn">SIGN IN</button>
          </form>
        </div>
        <div className="reg-content">
          <h1>Hello Friend</h1>
          <p>
            Don't have account ? Please sign up with your personal details to connect with us !
          </p>
          <Link className="nav-btn" to="/register">
            SIGN UP
          </Link>
        </div>
        <ToastContainer className="toast" />
      </section>
    );
}

export default Login