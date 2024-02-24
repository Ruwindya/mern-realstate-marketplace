import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from "../redux/user/userSlice"

export default function Profile() {

  const fileRef = useRef(null)
  const {currentUser,loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData , setFormData] = useState({});
  const dispatch = useDispatch();




  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() +file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef , file);
    

    uploadTask.on('state_changed',
      (snapshot) => {
        const  progress = snapshot.bytesTransferred / snapshot.totalBytes *100;
        setFilePerc(Math.round(progress));
      },  
      (error)  => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({...formData, avatar: downloadURL})
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser  = async ()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method : 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () =>{
    try{
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/sign-out');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      
    }catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-bold '>Welcome to Your Profile!</h1>
      <h1 className='text-center font-bold text-3xl gap-0 text-green-500'>Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          onChange={(e) => setFile(e.target.files[0])}  
          type="file" 
          ref={fileRef} 
          hidden accept="image/*"
          />

        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile_image" className="rounded-full h-28 w-28 
        shadow-md object-cover cursor-pointer self-center mt-2"/>

        <p className="self-center">
          { fileUploadError ? (
          <span className="text-red-700">Error Image Upload(image must be less than 2mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-600">
              {`${filePerc}% uploaded`}
            </span> 

            ): filePerc === 100 ? (
            <span className="text-green-800">
              Image Successfully uploaded
            </span>
            ) : (
              ''
          )}
        </p>

        <input 
          type="text" 
          placeholder="User Name" 
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg mt-3" 
          id="username" 
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-3 
          rounded-lg mt-3" 
          defaultValue={currentUser.email}
          id="email" 
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-3 rounded-lg mt-3" 
          id="password" 
          onChange={handleChange}
        />

        <button disabled={loading} className="bg-green-500 text-white text-center uppercase border p-3 rounded-lg
        font-bold hover:opacity-75 disabled:opacity-50">{loading ? 'Loading...' : 'Update'}</button>

      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
        <span onClick={handleSignOut}className="text-red-700 cursor-pointer font-semibold">Sign Out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-600 mt-5">{updateSuccess ? 'User is Updated Successfully' : ''}</p>
    </div>
  )
}
