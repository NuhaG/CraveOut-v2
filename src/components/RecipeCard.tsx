type RecipeCardProps = {
  name: string;
  img: string;
  instructions?: string;
  onClick?: () => void;
};

const RecipeCard = ({ name, img, instructions, onClick }: RecipeCardProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-card rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 w-full max-w-xs"
    >
      <img
        src={img}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-theme">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        {instructions && (
          <p className="text-sm text-card line-clamp-3">{instructions}</p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
