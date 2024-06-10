import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import PropTypes from "prop-types";

const URL = "https://bounce.extrasol.co.uk/api/attenders/categories";
const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
  },
};

export const CatContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const { data } = await axios.get(URL, config).then((res) => res.data);
    return data;
  };

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
