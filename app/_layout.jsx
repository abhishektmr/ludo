import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerShown: false,
            navigationBarHidden: true,
          }}
        >
          <Stack.Screen
            name="home"
            options={
              {
                // headerShown: false,
                // navigationBarHidden: true,
              }
            }
          ></Stack.Screen>
        </Stack>
      </PersistGate>
    </Provider>
  );
}
