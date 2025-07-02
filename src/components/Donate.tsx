const Donate = () => {
  return (
    <section id="donate" className="py-12 px-4">
      <h1 className="mt-8 text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--accent)]">
        Donate
      </h1>

      <div className="bg-card mx-auto p-6 rounded-xl shadow-md text-center text-theme">
        <h2 className="text-3xl font-semibold mb-4 text-[var(--accent)]">
          Feed the Hungry
        </h2>
        <p className="mb-6 text-card">
          Our Motto: Donate generously to support meals for those in need. Every contribution makes a difference!
        </p>

        <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-theme rounded-lg p-3" onClick={() => alert('Coming soon')}>
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default Donate;