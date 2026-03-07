import { useState } from "react";

const hungerFacts = [
  "UN estimates in 2023 suggested roughly 733 million people faced hunger worldwide.",
  "Around 2.3 billion people experienced moderate or severe food insecurity in 2023.",
  "Food crises are often driven by conflict, climate shocks, and economic instability.",
  "Child undernutrition remains one of the biggest long-term impacts of food insecurity.",
];

const Donate = () => {
  const [fact, setFact] = useState(
    hungerFacts[Math.floor(Math.random() * hungerFacts.length)]
  );

  const showNewFact = () => {
    let nextFact = fact;
    while (nextFact === fact) {
      nextFact = hungerFacts[Math.floor(Math.random() * hungerFacts.length)];
    }
    setFact(nextFact);
  };

  return (
    <section id="donate" className="py-12 px-4">
      <h1 className="mt-8 text-3xl md:text-4xl font-bold text-center mb-8 text-[var(--accent)]">
        Donate
      </h1>

      <div className="bg-card mx-auto rounded-xl shadow-md text-theme w-full max-w-7xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
          <img
            src="/hungry.webp"
            alt="Support food aid for people facing hunger"
            className="w-full h-56 md:h-full object-cover"
          />
          <div className="p-6 text-center md:text-left">
            <h2 className="text-3xl font-semibold mb-4 text-[var(--accent)]">
              Feed the Hungry
            </h2>
            <p className="mb-6 text-card">
              A small act of kindness can put food on someone's plate. Support the fight against hunger and help feed those in need.
            </p>
            <div className="mb-6 bg-[var(--bg)] rounded-lg p-4 border border-[var(--accent)]/40">
              <p className="text-card">
                <strong className="text-theme">Did you know?</strong> {fact}
              </p>
              <button
                type="button"
                onClick={showNewFact}
                className="mt-3 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] underline"
              >
                Show another fact
              </button>
            </div>
          </div>
        </div>

        {/* <button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-theme rounded-lg p-3" onClick={() => alert('Coming soon')}>
          Donate Now
        </button> */}
      </div>
    </section>
  );
};

export default Donate;
