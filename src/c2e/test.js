import React, { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    console.log("Current directory:", window.location.pathname);
  }, []);

  return <div>Test</div>;
};

export default Test;
