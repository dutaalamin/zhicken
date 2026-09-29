import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

/**
 * Skeleton loading dengan efek kilau (shimmer).
 * Dipakai saat data menu masih dimuat.
 */
export default function KartuSkeleton({ lebar }) {
  const kilau = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(kilau, {
          toValue: 1,
          duration: 850,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(kilau, {
          toValue: 0,
          duration: 850,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [kilau]);

  const opacity = kilau.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.9],
  });

  return (
    <View
      className="bg-white rounded-lg overflow-hidden border border-garis"
      style={lebar ? { width: lebar } : undefined}
    >
      <Animated.View
        className="w-full h-36 bg-abumuda"
        style={{ opacity }}
      />
      <View className="p-4">
        <Animated.View
          className="h-4 rounded-sm bg-abumuda"
          style={{ width: "70%", opacity }}
        />
        <Animated.View
          className="h-3 rounded-sm bg-abumuda mt-2.5"
          style={{ width: "100%", opacity }}
        />
        <Animated.View
          className="h-3 rounded-sm bg-abumuda mt-1.5"
          style={{ width: "55%", opacity }}
        />
        <View className="flex-row items-center justify-between mt-4">
          <Animated.View
            className="h-4 w-20 rounded-sm bg-abumuda"
            style={{ opacity }}
          />
          <Animated.View
            className="w-10 h-10 rounded-sm bg-abumuda"
            style={{ opacity }}
          />
        </View>
      </View>
    </View>
  );
}
