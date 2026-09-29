import React from "react";
import { View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import BerandaScreen from "./src/screens/BerandaScreen";
import PromoScreen from "./src/screens/PromoScreen";
import PesananScreen from "./src/screens/PesananScreen";
import AkunScreen from "./src/screens/AkunScreen";
import DetailScreen from "./src/screens/DetailScreen";
import MasukScreen from "./src/screens/MasukScreen";
import AlamatScreen from "./src/screens/AlamatScreen";
import VoucherScreen from "./src/screens/VoucherScreen";
import BantuanScreen from "./src/screens/BantuanScreen";
import { StoreProvider, useStore } from "./src/store/Store";
import { warna } from "./src/theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BerandaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BerandaUtama" component={BerandaScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ presentation: "modal", animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
}

function AkunStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AkunUtama" component={AkunScreen} />
      <Stack.Screen
        name="Masuk"
        component={MasukScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="Alamat"
        component={AlamatScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Voucher"
        component={VoucherScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Bantuan"
        component={BantuanScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}

function Navigasi() {
  const { jumlah } = useStore();

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: warna.merah,
          tabBarInactiveTintColor: warna.abu,
          tabBarStyle: {
            height: 84,
            paddingBottom: 20,
            paddingTop: 10,
            borderTopColor: warna.garis,
            backgroundColor: "#fff",
          },
          tabBarLabelStyle: {
            fontFamily: "Inter_600SemiBold",
            fontSize: 11,
            lineHeight: 15,
            marginTop: 3,
          },
          tabBarIcon: ({ color, size, focused }) => {
            const ikon = {
              Beranda: focused ? "home" : "home-outline",
              Promo: focused ? "pricetag" : "pricetag-outline",
              Pesanan: focused ? "receipt" : "receipt-outline",
              Akun: focused ? "person" : "person-outline",
            }[route.name];
            return <Ionicons name={ikon} size={size ?? 22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Beranda" component={BerandaStack} />
        <Tab.Screen name="Promo" component={PromoScreen} />
        <Tab.Screen
          name="Pesanan"
          component={PesananScreen}
          options={{ tabBarBadge: jumlah > 0 ? jumlah : undefined }}
        />
        <Tab.Screen name="Akun" component={AkunStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontSiap] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontSiap) {
    return <View style={{ flex: 1, backgroundColor: warna.bg }} />;
  }

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <StoreProvider>
          <Navigasi />
        </StoreProvider>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
