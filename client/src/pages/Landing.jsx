import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";

const Landing = () => {
	return (
		<div className="min-h-screen bg-white text-gray-900 selection:bg-blue-500 selection:text-white">
			<Navbar />
			<Hero />
			<Features />
			<HowItWorks />
		</div>
	);
};

export default Landing;
