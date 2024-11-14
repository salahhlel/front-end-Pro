import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from './Splash & Login/spalsh';
import Splash2 from './Splash & Login/spalsh2';
import Login from './Splash & Login/Login';
import SignUp from './Splash & Login/Signup';
import AcountDet from './Splash & Login/AcountDet'
import ForgetPassword from './Splash & Login/ForgetPass';
import NPassword from './Splash & Login/Npassword';
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Splash"></Stack.Navigator>
      <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
      <Stack.Screen name="Splash2" options={{ headerShown: false }} component={Splash2} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp}/>
      <Stack.Screen name="ForgetPassword" options={{ headerShown: false }} component={ForgetPassword}/>
      <Stack.Screen name="NPassword" options={{ headerShown: false }} component={NPassword}/>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
