import React from "react";
import { Link, useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Connect. Collaborate. Code.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Meet developers who share your skills, passions, and project goals.
          Whether you're looking for a coding partner, a mentor, or a new friend
          in tech, DevTinder brings the community to you.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition" onClick={()=>navigate("/login")}>
          Get Started 
        </button>
        <div className="mt-10 flex justify-center">
          <img
            src="https://www.shakebugs.com/wp-content/uploads/2022/05/Benefits-of-teamwork-and-collaboration-for-software-development-teams.png"
            alt="Developers collaborating"
            className="rounded-lg shadow-lg h-1/2 w-1/2"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-200 mb-12">Why DevTinder?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-gray-100 max-w-6xl mx-auto">
          <div>
            <div className="text-amber-500 text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Find Like-Minded Developers</h3>
            <p>
              Discover people who share your tech stack and interests to build
              exciting projects together.
            </p>
          </div>
          <div>
            <div className="text-amber-500 text-5xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2">Collaborate on Projects</h3>
            <p>
              Turn your ideas into reality with the right partner and make your
              portfolio shine.
            </p>
          </div>
          <div>
            <div className="text-amber-500 text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Learn & Grow Together</h3>
            <p>
              Share knowledge, mentor others, and grow your skills faster than
              ever before.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-amber-500 text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">1. Create Your Profile</h3>
            <p>Showcase your skills, tech stack, and project interests.</p>
          </div>
          <div>
            <div className="text-amber-500 text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">2. Match With Developers</h3>
            <p>Swipe or search for developers who match your criteria.</p>
          </div>
          <div>
            <div className="text-amber-500 text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">3. Start Collaborating</h3>
            <p>Build amazing projects together and learn new skills.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 text-center text-gray-300">
        <h2 className="text-3xl font-bold mb-6">
          Join a Growing Network of Developers Worldwide
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          From students learning their first language to senior engineers
          leading global projects — everyone has a place here.
        </p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/IMF_advanced_economies_and_UN_least_developed_countries.svg/960px-IMF_advanced_economies_and_UN_least_developed_countries.svg.png"
          alt="Global community map"
          className="mx-auto rounded-lg shadow-lg h-1/2 w-1/2"
        />
      </section>

      {/* Final Call to Action */}
      <section className="bg-amber-500 text-white py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Coding Partner?
        </h2>
        <button className="bg-white cursor-pointer text-amber-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition" onClick={()=>(navigate("/login"))}>
          Join DevTinder Now
        </button>
      </section>
    </div>
  );
};

export default Home;
