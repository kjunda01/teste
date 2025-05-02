import React from "react";

const ComponentLoader = ({ isLoading = false, children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded">
          <div className="w-6 h-6 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className={`${isLoading ? "opacity-40" : "opacity-100"} transition-opacity duration-300`}>{children}</div>
    </div>
  );
};

export default ComponentLoader;
