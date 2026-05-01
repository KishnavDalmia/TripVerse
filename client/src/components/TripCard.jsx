const TripCard = ({trip}) => {
  const from = new Date(trip.fromDate);
  const to = new Date(trip.toDate);
  return (
    <div className='flex flex-col py-4 gap-5 shadow-lg hover:border-2 border-blue-500 rounded-lg cursor-pointer transition duration-300
     justify-evenly items-center w-80 h-92 hover:shadow-2xl'>
        <img src={trip.imgURL || '/trip1.png'} alt="Trip Image" width={320} height={200} className='rounded-lg mb-4' />
        <h2 className='px-4 font-bold text-2xl w-full text-left'>{trip.title}</h2>
        <div className='flex justify-start text-left gap-2 items-center w-full px-4'>
            <img src="/schedule.svg" alt="Trip Image" width={20} height={20} className='rounded-lg' />
            <span className='text-neutral-700'>{from.toLocaleDateString()} - {to.toLocaleDateString()}</span>
        </div>
        <div className='flex gap-1 justify-end w-full px-4 items-center'> 
            <img src="/people.svg" alt="Trip Image" width={20} height={20} className='rounded-lg' />
            <span className='text-neutral-600'>{trip.numPeople}</span>
        </div>
        
    </div>
  )
}

export default TripCard