import { MdAddPhotoAlternate } from "react-icons/md"
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

//firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

//components
import { auth, db, storage } from "../firebase";
//style
import "../style/Register.scss"




export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const fileInput = e.target[3];
    const file = fileInput.files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const fileId = uuidv4();
      const storageRef = ref(storage, `avatars/${res.user.uid}/${fileId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(snapshot);
        },
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "usersChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
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
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <MdAddPhotoAlternate className="addPhotoIcon" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span className="error">Something went</span>}
        </form>
        <p>You need have an account? <Link to="/login" className="link">Login</Link></p>
      </div>
    </div>
  )
}
