// import "expo-router/entry";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as Linking from "expo-linking";

// import SignupScreen from "./app/(tabs)/SignupScreen";
// import LoginScreen from "./app/(tabs)/LoginScreen";
// import EmailVerifyScreen from "./app/(tabs)/EmailVerifyScreen";

// const Stack = createNativeStackNavigator();

// const linking = {
//   prefixes: ["myapp://", "http://192.168.1.48:8080"], // <- yaha backend ka link bhi daala
//   config: {
//     screens: {
//       Signup: "signup",
//       Login: "login",
//       Verify: {
//         path: "signup/verify", // <- backend ka route
//         parse: {
//           token: (token: string) => `${token}`, // token ko pakdega
//         },
//       },
//     },
//   },
// };

// export default function App() {
//   return (
//     <NavigationContainer linking={linking} fallback={<SignupScreen />}>
//       <Stack.Navigator initialRouteName="Signup">
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Verify" component={EmailVerifyScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Linking from "expo-linking";

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType) => {
      const { queryParams } = Linking.parse(event.url);
      if (queryParams?.token) {
        setToken(queryParams.token as string);
      }
    };

    // App khulte hi check kar
    Linking.getInitialURL().then((url) => {
      if (url) {
        const { queryParams } = Linking.parse(url);
        if (queryParams?.token) {
          setToken(queryParams.token as string);
        }
      }
    });

    // Listener lagao
    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  if (token) {
    return <EmailVerifyScreen token={token} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome! Signup / Login Screen Here</Text>
    </View>
  );
}

// ✅ Email Verify Screen
function EmailVerifyScreen({ token }: { token: string }) {
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    fetch(`http://192.168.1.48:8080/signup/verify?token=${token}`)
      .then((res) => res.text()) // <- kyunki backend HTML bhej raha hai
      .then((data) => {
        console.log("Backend Response:", data);
        setStatus("Verification Success ✅");
      })
      .catch(() => setStatus("Verification failed ❌"));
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Email Verification</Text>
      <Text>Status: {status}</Text>
    </View>
  );
}
