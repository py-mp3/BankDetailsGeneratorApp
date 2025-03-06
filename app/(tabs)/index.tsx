import { Image, StyleSheet, Platform, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  async function getPassword() {
    try {
      const response = await fetch("http://localhost:3000/password");
      if (!response.ok) {
        console.log("Error:", response.status);
      }

      const json = await response.json();
      setPassword(json.password);
      console.log(json);
    } catch (error: any) {
      console.log("Error:", error.message);
      console.log(password);
      setPassword(password);
    }
  }
  async function getUsername() {
    try {
      const response = await fetch("http://localhost:3000/username");
      if (!response.ok) {
        console.log("Error:", response.status);
      }

      const json = await response.json();
      setUsername(json.username);
      console.log(json);
    } catch (error: any) {
      console.log("Error:", error.message);
      console.log(username);
      setUsername(username);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Try my Username generator</ThemedText>
        <ThemedText>
          Press the button to generate a password
          <Button title="Generate Username" onPress={() => getUsername()} />
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Username:{username}</ThemedText>
        </ThemedText>
        <ThemedText type="subtitle">Try my password generator</ThemedText>
        <ThemedText>
          Press the button to generate a password
          <Button title="Generate Password" onPress={() => getPassword()} />
        </ThemedText>
        <ThemedText>
          {visible ? (
            <ThemedText type="defaultSemiBold">Password:{password}</ThemedText>
          ) : (
            <ThemedText type="defaultSemiBold">Password:********</ThemedText>
          )}
        </ThemedText>
        <ThemedText>
          <Button title="Hide password" onPress={() => setVisible(!visible)} />
        </ThemedText>
        <ThemedText>
          <Button
            title="Copy"
            onPress={() => navigator.clipboard.writeText(password)}
          />
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
