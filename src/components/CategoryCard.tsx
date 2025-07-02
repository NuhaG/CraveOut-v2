import React from "react";

type CategoryCardProps = {
  name: string;
  img: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ name, img }) => {
  return (
    <div
      className="rounded-xl overflow-hidden bg-card shadow-md border-[0.5px] border-[var(--accent)]"
    >
      <img
        src={img}
        alt={name}
        className="w-full h-44 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-theme">{name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
