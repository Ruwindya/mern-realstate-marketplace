import React from 'react'

function CreateListing() {
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
              <input type="file" id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded w-full'/>
              <button className='p-3 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
            </div>

            <button className='p-3 font-bold text-white  bg-green-600 rounded uppercase hover:shadow-lg hover:opacity-60 disabled:opacity-60'>Create Listing</button>
        </div>
        
      </form>
    </main>
  )
}

export default CreateListing