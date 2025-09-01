// config.ts
import { Platform } from "react-native";

let BASE_URL = "http://localhost:8080";

if (Platform.OS === "android") {
  BASE_URL = "http://10.0.2.2:8080";
} else if (Platform.OS === "ios") {
  BASE_URL = "http://localhost:8080";
}

// For real devices (Expo Go)
const LOCAL_NETWORK_IP = "192.168.1.48"; // replace with your PC IPv4
const USE_LOCAL_NETWORK = true;

if (USE_LOCAL_NETWORK) {
  BASE_URL = `http://${LOCAL_NETWORK_IP}:8080`;
}

export default BASE_URL;
