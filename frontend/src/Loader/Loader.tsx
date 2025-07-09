import React from "react";
import type { LoaderProps } from "../types/loginAuth";

const Loader: React.FC<LoaderProps> = ({
  size = 24,
  color = "text-blue-500",
}) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full h-${size} w-${size} border-b-2 border-r-2 ${color}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
