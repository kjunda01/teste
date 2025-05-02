import React, { useState } from "react";

const LoadingWrapper = ({ children, className = "" }) => {
  const [loaded, setLoaded] = useState(false);

  const wrappedChild = React.cloneElement(children, {
    onLoad: () => setLoaded(true),
    ...children.props,
  });

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-blue-950 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className={`${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>{wrappedChild}</div>
    </div>
  );
};

export default LoadingWrapper;
