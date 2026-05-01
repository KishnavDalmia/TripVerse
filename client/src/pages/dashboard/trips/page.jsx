import React from 'react'
import Form from 'next/form'
import { createTrip } from '@/lib/queries/trips'
const page = () => {
  return (
    <div className='w-150 m-auto shadow-lg p-6 rounded-lg my-10'>
        <div className="text-center">
            <h2 className='text-2xl font-bold mb-2'>Create a New Trip</h2>
            <p className='text-neutral-500'>Plan your next adventure</p>
        </div>
            <Form action={createTrip} className="form-group my-8">
                <div className='flex flex-col gap-4'>
                    <div>
                        <h4 className="text-lg font-semibold">Basic Information</h4>
                        <p className='text-neutral-500 mt-1'>Enter details about your trip</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trip Name</label>
                        <input required name="title" type="text" className="block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="My Summer Vacation" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Destination</label>
                        <input required name="location" type="text" className="block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Paris, France" />
                    </div> 
                    <div className='flex gap-8'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mt-4">Start Date</label>
                            <input reuired name="fromDate" type="date" className="border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mt-4">End Date</label>
                            <input required name="toDate" type="date" className="border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mt-4">Number of People</label>
                    <input required name="numPeople" type="number" className="border border-gray-300 rounded-md shadow-sm p-2" placeholder="2" />
                </div>
                  
                <button type="submit" className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Create Trip</button>
            </Form>    
    </div>
  )
}

export default page