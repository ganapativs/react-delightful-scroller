import { useEffect } from "react";

export const DetectUnmount = () => {
  useEffect(() => {
    return () => console.log("Unmounts");
  }, []);

  return "Sample component to check if the component is unmounting between renders";
};
