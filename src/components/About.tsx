const About = () => {
  return (
    <section id="about" className="py-12 px-4 bg-card text-theme">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--accent)]">
          About CraveOut
        </h1>
        <p className="text-lg text-card mb-4">
          CraveOut is your ultimate destination to explore delicious recipes from around the world. Whether you're a passionate home cook or just getting started, we bring the best flavors right to your screen.
        </p>
        <p className="text-md text-card italic">
          “People who love to eat are always the best people.” - Julia Child
        </p>
      </div>
    </section>
  );
};

export default About;
