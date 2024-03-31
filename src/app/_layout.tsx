import store from "@/store/store";
import { Slot } from "expo-router";
import { Provider } from "react-redux";

function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}

export default RootLayout;
