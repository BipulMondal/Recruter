import React from "react";

const Header = ({ category, title }) => {
  return (
    <div className="mb-10">
      <p className="text-gray-400">{category}</p>
      <p className="text-slate-600 text-2xl font-extrabold tracking-tight">
        {title}
      </p>
    </div>
  );
};

export default Header;
