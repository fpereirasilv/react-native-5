import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Acceleration from "./src/screens/Acceleration";
import Profile from "./src/screens/Profile";
import Login from "./src/screens/Login";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Acceleration: {
      screen: Acceleration
    },
    Profile: {
      screen: Profile
    }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
