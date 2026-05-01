const Features = () => {
  return (
    <div id="features" className='bg-slate-50 py-20'>
      <div className="mx-auto mt-15">
        <h2 className="w-[55%] text-5xl font-bold text-center mx-auto tracking-tighter">Everything you need to plan the <span className="text-blue-500">perfect trip</span>.</h2>
        <p className='w-[40%] mt-10 text-lg to-neutral-800 mx-auto text-center my-18'>From the first brainstorm to the final goodbye, TripSync has you covered with powerful features built for groups.</p>
      </div>
      <div className='grid gap-10 grid-cols-3 grid-rows-2 mx-auto w-[75%]'>
        <div className="rounded-xl bg-white shadow-lg border-neutral-200 border-3 p-5 hover:border-b-blue-400">
          <img src="/vote.svg" alt="Features Image" className="bg-blue-500 p-4 rounded-xl" width={30} height={30}/>
          <h3 className='font-bold text-xl py-3'>Vote on Decisions</h3>
          <p>Let everyone have a say. Create polls, rank options, and find the perfect destination that works for the whole group.</p>
        </div>
        <div className="rounded-xl bg-white shadow-lg border-neutral-200 border-3 p-5 hover:border-b-orange-400">
          <img src="/wallet.svg" alt="Features Image" className='bg-orange-300 p-4 rounded-xl' width={30} height={30}/>
          <h3 className='font-bold text-xl py-3'>Smart Expense Splitting</h3>
          <p>Split expenses easily and fairly among group members. Track costs and settle up with just a few clicks.</p>
        </div>
        <div className="rounded-xl bg-white shadow-lg border-neutral-200 border-3 p-5 hover:border-b-blue-400">
          <img src="/people.svg" alt="Features Image" className="bg-blue-500 p-4 rounded-xl" width={30} height={30}/>
          <h3 className='font-bold text-xl py-3'>Real Time Collaboration</h3>
          <p>Work together in real time. Share updates, make changes, and keep everyone in the loop as your trip evolves.</p>
        </div>
        <div className="rounded-xl bg-white shadow-lg border-neutral-200 border-3 p-5 hover:border-b-orange-400">
          <img src="/itinerary.svg" alt="Features Image" className='bg-orange-300 p-4 rounded-xl' width={30} height={30}/>
          <h3 className='font-bold text-xl py-3'>Interactive Itinerary</h3>
          <p>Plan and visualize your trip itinerary with interactive maps, timelines, and group collaboration tools.</p>
        </div>
        <div className="rounded-xl bg-white shadow-lg border-neutral-200 border-3 p-5 hover:border-b-blue-400">
          <img src="/schedule.svg" alt="Features Image" className="bg-blue-500 p-4 rounded-xl" width={30} height={30}/>
          <h3 className='font-bold py-3 text-xl'>Schedule Coordination</h3>
          <p>Coordinate schedules effortlessly. Find common free times and plan activities that fit everyone's availability.</p>
        </div>
        <div className="rounded-xl bg-white shadow-lg border-neutral-200 border-3 p-5 hover:border-b-orange-400">
          <img src="/chats.svg" alt="Features Image" className='bg-orange-300 p-4 rounded-xl' width={30} height={30}/>
          <h3 className='font-bold text-xl py-3'>Group Chat</h3>
          <p>Stay connected with your travel group through integrated messaging and discussion features.</p>
        </div>
      </div>
    </div>
    
  )
}

export default Features