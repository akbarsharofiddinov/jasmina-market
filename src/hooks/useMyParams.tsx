import { useLocation } from "react-router-dom";

export const useMyParams = () => {
  let quearyParams = useLocation().search;
  return (quearyParams = quearyParams.slice(3));
};
