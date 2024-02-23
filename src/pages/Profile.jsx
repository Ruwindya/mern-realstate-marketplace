import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'


export default function Profile() {

  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData , setFormData] = useState({});

  console.log(formData);


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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-bold '>Welcome to Your Profile!</h1>
      <h1 className='text-center font-bold text-3xl gap-0 text-green-500'>Profile</h1>

      <form className="flex flex-col gap-3">
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

        <input type="text" placeholder="User Name" className="border p-3 rounded-lg mt-3" id="username" />
        <input type="email" placeholder="Email" className="border p-3 rounded-lg mt-3" id="email" />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg mt-3" id="password" />

        <button className="bg-green-500 text-white text-center uppercase border p-3 rounded-lg
        font-bold hover:opacity-75">Update</button>

      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-red-700 cursor-pointer font-semibold">Sign Out</span>
      </div>
    </div>
  )
}
