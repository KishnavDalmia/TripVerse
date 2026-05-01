const Hero = () => {
  return (
    <main className="container mx-auto px-4 py-16 w-[70%]">
        <div className="bg-blue-400/10 font-extralight text-blue-600 rounded-2xl text-center px-5 py-1 w-fit mx-auto mt-20 flex gap-2">
          <img src="/plane-svgrepo-com.svg" alt="Airplane Icon" width={20} height={20} />
          <span>The smarter way to plan trips.</span>
        </div>  
        <h1 className="text-5xl md:text-7xl font-bold text-center mt-8 text-gray-900
         font-serif leading-tight">
          Plan trips together,<br />
          <span className="text-center font-black bg-linear-to-r from-blue-600
           via-purple-400 to-yellow-500 bg-clip-text
            text-transparent">stress-free</span>
        </h1>
        <p className="text-center mt-8 text-gray-600 w-[70%] mx-auto">Stop juggling group chats and 
          spreadsheets. TripSync brings everyone together to vote on destinations, split
           expenses fairly, and coordinate every detail in real-time.Create and manage
            group trips with ease and confidence.</p>
        <div className="flex w-[50%] justify-evenly items-center gap-1 mt-12 mx-auto">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-shadow-sm
           hover:bg-blue-700 hover:text-shadow-lg transition cursor-pointer">Start Planning</button>
          <button className="hover:bg-amber-500 px-6 py-3 border-slate-200 rounded-xl"><a href="#how-it-works">See how it works</a></button>
        </div>
      </main>
  )
}

export default Hero