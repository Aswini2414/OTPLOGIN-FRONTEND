import { useState,React} from 'react'
import { Link,useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import { registerUser } from '../services/api';


const Register = () => {
  const [user, setUser] = useState({
    name: " ",
    email: " ",
    password: " "
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { name, email, password } = user;
    if (name === " ") {
      toast.error("Enter your name!");
    } else if (user.email === " ") {
      toast.error("Enter your email!");
    } else if (!email.includes("@")) {
      toast.error("Enter valid email!");
    } else if (user.password === " "){
      toast.error("Enter your password!");
    }else if (password.length < 6) {
      toast.error("Password length should be minimum of 6 characters");
    } else {
        const response = await registerUser(user);
      //   setUser({ ...user, name: " ", email: " ", password: " " });
      // navigate("/login");
     
        if (response.status === 200) {
          setUser({ ...user, name: " ", email: " ", password: " " });
          navigate("/login");
        } else {
          toast.error("Sing Up unsuccessful");
        }
    }
  }
  return (
    <section className="registerContainer">
      <div className="reg-content">
        <h1>Welcome Back</h1>
        <p>
          If you already have account please login to keep connected with us
        </p>
        <Link className="nav-btn" to="/login">
          SIGN IN
        </Link>
      </div>
      <div className="reg-form">
        <h1>Create Account</h1>
        <form className="form">
          <input
            type="text"
            name="name"
            onChange={(e) => changeHandler(e)}
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            onChange={(e) => changeHandler(e)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => changeHandler(e)}
            placeholder="Password"
          />
          <button className="btn" onClick={(e)=>handleSubmit(e)}>SIGN UP</button>
        </form>
      </div>
      <ToastContainer className="toast"/>
    </section>
  );
}

export default Register