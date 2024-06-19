import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/publicService";

import PropTypes from "prop-types";

export const CatContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  return (
    <CatContext.Provider value={{ categories, isLoading, error }}>
      {children}
    </CatContext.Provider>
  );
};
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
