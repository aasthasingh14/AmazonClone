
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import store from "./store";
import { ModalPortal } from "react-native-modals"; 
import { UserProvider } from "./UserProvider"; 


export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <StackNavigator />
          <ModalPortal />
        </UserProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
