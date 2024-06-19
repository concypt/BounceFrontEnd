// Providers.js
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropTypes from "prop-types";
import GlobalProvider from "../contexts/GlobalProvider";
import UserProvider from "../contexts/UserProvider";

const queryClient = new QueryClient();

const Providers = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <GlobalProvider>
        {children}
        <ReactQueryDevtools />
      </GlobalProvider>
    </UserProvider>
  </QueryClientProvider>
);
Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Providers;
