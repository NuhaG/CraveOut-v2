import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Hero = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    // Replace this with your actual search logic
    console.log("Searching for:", query);

    if (typeof window === "undefined") return;
    if (query) setQuery(query.trim());
    // Example: redirect to a results page
    // window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  return (
    <section>
      <div className="flex flex-col justify-center h-screen text-center px-4">
        <h1 className="font-bold text-5xl md:text-7xl">Welcome to Crave Out</h1>
        <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-normal md:font-medium text-[var(--accent-hover)]">
          Your Ultimate Destination for Delicious Recipes
        </h3>
        <p className="text-card mt-4 hidden sm:block">
          Discover the best recipes from around the world. Whether you're a
          seasoned chef or a home cook, we have something for everyone.
        </p>
        <div className="flex justify-center items-center mt-6 md:mt-10 mx-auto text-theme w-[100%]">
          <input
            type="text"
            placeholder="Search Your Next Recipe..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-2 border-[var(--accent)] rounded-l-lg p-2 md:p-4 text-md focus:border-[var(--accent-hover)] focus:outline-none w-full md:w-[500px] h-[100%] text-theme"
          />
          <button
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-r-lg p-2 ml-2 flex items-center justify-center h-[100%]"
            onClick={handleSearch}
          >
            <BiSearch size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
