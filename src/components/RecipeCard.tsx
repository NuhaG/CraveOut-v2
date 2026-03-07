import { IoHeart, IoHeartOutline } from "react-icons/io5";

type RecipeCardProps = {
  id?: string;
  name: string;
  img: string;
  instructions?: string;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

const RecipeCard = ({
  name,
  img,
  instructions,
  onClick,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer bg-card rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 w-full max-w-xs"
    >
      {onToggleFavorite && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 z-10 bg-black/45 rounded-full p-1 text-white hover:text-[var(--accent-hover)]"
        >
          {isFavorite ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
        </button>
      )}
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
