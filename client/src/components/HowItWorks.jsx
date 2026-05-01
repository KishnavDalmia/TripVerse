const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-20 bg-slate-50">
      <div className="mx-auto w-[75%]">
        <h2 className="text-5xl font-bold text-center">How It Works</h2>
        <p className="text-lg text-center mt-10">TripSync makes planning trips easy and fun for everyone involved.</p>
      </div>
      <div id="timeline" className=''>
        <div className='absolute h-100 w-0.5 left-40 bg-blue-200'>
          <div className="absolute -left-5 top-0 w-12 h-12 rounded-full bg-blue-300 p-3">
           <img src="/people.svg" className="z-100" alt="" width={40} height={40} />
          </div>
          <div className="absolute -left-5 top-32 w-12 h-12 rounded-full bg-blue-300 p-3">
           <img src="/maps.svg" alt="" width={40} height={40} />
          </div>
          <div className="absolute -left-5 top-64 w-12 h-12 rounded-full bg-blue-300 p-3">
            <img src="/dollar.svg" alt="" width={40} height={40} />
          </div>
          <div className="absolute -left-5 top-96 w-12 h-12 rounded-full bg-blue-300 p-3">
            <img src="/tick.svg" alt="" width={40} height={40} />
          </div>
        </div>
        <div className="relative left-50 m-10 z-10">
          <p className='text-blue-500 text-xl inline mx-5'>Step 1</p> <h3 className='font-semibold text-2xl inline'>Create a Trip</h3>
          <p className='text-neutral-600 m-5'>Start by creating a new trip and adding your travel companions.</p>
        </div>
        <div className="relative left-50 m-10">
          <p className='text-blue-500 text-xl inline mx-5'>Step 2</p> <h3 className='font-semibold text-2xl inline'>Plan Together</h3>
          <p className='text-neutral-600 m-5'>Vote on destinations, discuss dates, and build your itinerary collaboratively in real-time with your group.</p>
        </div>
        <div className="relative left-50 m-10">
          <p className='text-blue-500 text-xl inline mx-5'>Step 3</p> <h3 className='font-semibold text-2xl inline'>Track Expenses</h3>
          <p className='text-neutral-600 m-5'>Log every expense as you travel. TripSync automatically calculates who owes whom and settles up.</p>
        </div>
        <div className="relative left-50 m-10">
          <p className='text-blue-500 text-xl inline mx-5'>Step 4</p> <h3 className='font-semibold text-2xl inline'>Enjoy Your Trip</h3>
          <p className='text-neutral-600 m-5'>Focus on enjoying your trip without worrying about splitting costs or tracking expenses.</p>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks