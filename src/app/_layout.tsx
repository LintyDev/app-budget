import store from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </Provider>
  );
}

export default RootLayout;
