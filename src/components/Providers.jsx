// Providers.js
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropTypes from "prop-types";
import GlobalProvider from "../contexts/GlobalProvider"; // Example provider
// import { AuthProvider } from "./AuthProvider"; // Example provider

const queryClient = new QueryClient();

const Providers = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {/* <AuthProvider> */}
    <GlobalProvider>
      {children}
      <ReactQueryDevtools />
    </GlobalProvider>
    {/* </AuthProvider> */}
  </QueryClientProvider>
);
Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Providers;
