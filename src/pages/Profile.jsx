import { useSelector } from "react-redux"


export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-bold '>Welcome to Your Profile!</h1>
      <h1 className='text-center font-bold text-3xl gap-0 text-green-500'>Profile</h1>

      <form className="flex flex-col gap-3">
        <img src={currentUser.avatar} alt="profile_image" className="rounded-full h-28 w-28 
        shadow-md object-cover cursor-pointer self-center mt-2"/>
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
