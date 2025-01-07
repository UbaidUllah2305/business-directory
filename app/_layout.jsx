import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Clerk, ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function _layout() {
  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <Text>Signout</Text>
      </SignedOut>
    </ClerkProvider>
  );
}
