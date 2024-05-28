import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";

const Stack = createStackNavigator();

export default function Routes() {
    return (
        
        <Stack.Navigator>

            <Stack.Screen name="Welcome" component={Welcome} />
 
            <Stack.Screen name="Login" component={Login} />
        
        </Stack.Navigator>

    )
}