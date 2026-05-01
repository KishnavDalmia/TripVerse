const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-5 
    sticky top-0 z-50 bg-white/65 transition-all duration-300
    border-b border-gray-200'>
        <div className="p-2 flex items-center gap-3">
            <img src="/airplane.svg" alt="Logo" width={60} height={30} />
            <span className='font-bold'>TripVerse</span>
        </div>
        <div className="flex justify-evenly items-center gap-5">
            <a href='#features' className='hover:underline decoration-2 transition-all duration-500'>Features</a>
            <a href='#how-it-works' className='hover:underline decoration-2 transition-all duration-500'>How It Works</a>
            <a href='#about' className='hover:underline decoration-2 transition-all duration-500'>About</a>
        </div>
        <div className="flex items-center gap-5">
            <a href='/login' className='hover:bg-amber-600 px-4 py-1 rounded-lg'>Login</a>
        </div>
    </div>
  )

}

export default Navbar