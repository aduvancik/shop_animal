import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//firebase
import { signInWithEmailAndPassword } from "firebase/auth";

//components
import { auth } from "../firebase";


export default function Login() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      
    } catch (err) {
      console.error("An error occurred during registration:", err);
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Lama Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>            
                <button>Sign in</button>
                {err && <span className="error">Something went</span>}
            </form>
            <p>You don't have an account? <Link to="/register" className="link">Register</Link></p>
        </div>
    </div>
  )
}
