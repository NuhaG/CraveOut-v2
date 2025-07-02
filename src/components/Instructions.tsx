type InstructionCardProps = {
  name: string;
  img: string;
  instructions: string;
  onClose: () => void;
};

const InstructionCard = ({
  name,
  img,
  instructions,
  onClose,
}: InstructionCardProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="max-w-lg w-full bg-card text-theme rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-xl font-bold text-theme rounded-md p-3"
        >
          X
        </button>
        <img
          src={img}
          alt={name}
          className="w-full h-52 object-cover rounded-lg mb-4"
        />
        <h2 className="text-3xl font-bold mb-2 text-[var(--accent)]">{name}</h2>
        <p className="text-card max-h-64 overflow-y-scroll">
          <b>Instructions:</b>
          <br />
          {instructions}
        </p>
      </div>
    </div>
  );
};

export default InstructionCard;
