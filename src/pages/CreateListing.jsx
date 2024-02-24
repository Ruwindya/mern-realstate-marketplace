import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

function CreateListing() {
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({ 
    imageUrls: [],})
  
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading,setUploading] = useState(false);
  console.log(formData);
  
  const handleImageSubmit = (e) =>{
    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      setUploading(true);
      const promises = [];

      for (let i=0; i< files.length;i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
          setFormData({...formData, imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false)
      }).catch((err)=>{
        setImageUploadError('Image upload failed (2mb max per image)');
        setUploading(false)
      });
    }else{
      setImageUploadError('Maximum of 6 images allowed');
      setUploading(false)
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject)=>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() +file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      
      uploadTask.on('state changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log(`Upload is ${progress} % done`);
        },
        (error) =>{
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL);
          })
        }
      )
    })
  } 

const handleRemoveImage  = (index) => {
  setFormData({
    ...formData,
    imageUrls: formData.imageUrls.filter((_, i) => i !== index),
  });
};
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <div>
      <h1 className='text-green-500 text-3xl font-semibold text-center '>Create a Listing</h1>
      <h1 className='text-black-500 text-xl font-semibold text-center my-7'>Publish your listing here</h1>
      </div>
      

      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
        <input 
          type="text" 
          placeholder='Name' 
          className='border p-2 rounded-lg' 
          id='name' 
          maxLength='62' 
          minLength='10'
          required
        />
        <textarea 
          type="text" 
          placeholder='Description' 
          className='border p-2 rounded-lg' 
          id='description' 
          required
        />
        <input 
          type="text" 
          placeholder='Address' 
          className='border p-2 rounded-lg' 
          id='address' 
          required
         
        />

        <div className='flex gap-2 flex-wrap '>
          <div className='flex gap-2'>
            <input type="checkbox" id='sale' className='w-5' />
            <span className='font-semibold'>Sell</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='rent' className='w-5' />
            <span className='font-semibold'>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='parking' className='w-5' />
            <span className='font-semibold'>Parking Spot</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='furnished' className='w-5' />
            <span className='font-semibold'>Furnished</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='offer' className='w-5' />
            <span className='font-semibold'>Offer</span>
          </div>

        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
            <input 
              type="number" 
              id='bedrooms' 
              min='1' 
              max="10" 
              required
              className='p-2 border-gray-300 rounded-lg' />
            <span className='font-semibold'>Bed Rooms</span>
          </div>
          <div className='flex items-center gap-2'>
            <input 
              type="number" 
              id='bathrooms' 
              min='1' 
              max="10" 
              required
              className='p-2 border-gray-300 rounded-lg' />
            <span className='font-semibold'>Bath Rooms</span>
          </div>
          <div className='flex items-center gap-2'>
            <input 
              type="number" 
              id='regularPrice' 
              min='1' 
              max="10" 
              required
              className='p-2 border-gray-300 rounded-lg' />
              <div className='flex flex-col items-center'>
                <span className='font-semibold'>Regular Price</span>
                <p className='text-xs'>(Rs/Month)</p>
              </div>
            
          </div>
          <div className='flex items-center gap-2'>
            <input 
              type="number" 
              id='discountedPrice' 
              min='1' 
              max="10" 
              required
              className='p-2 border-gray-300 rounded-lg' />
            <div className='flex flex-col items-center'>
                <span className='font-semibold'>Regular Price</span>
                <p className='text-xs'>(Rs/Month)</p>
              </div>
          </div>
        </div>

        </div>
        <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>Images :
            <span className='text-grey-600 ml-2 font-normal'>The First image will be the cover image(max 6)</span></p>

            <div className='flex gap-4'>
              <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded w-full'/>
              <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                { uploading ? 'uploading...' : 'Upload'}</button>
            </div>
            <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
            {
              formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                <div key={url} className='flex justify-between p-3 border items-center'>
                  <img src={url} alt='product-image' className='w-20 h-20 rounded-lg object-contain '/>
                  <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-60'>Delete</button>
                </div>
              ))
            }
            <button className='p-3 font-bold text-white 
             bg-green-600 rounded uppercase hover:shadow-lg 
             hover:opacity-60 disabled:opacity-60'>Create Listing</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing