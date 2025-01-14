import { FlatList, ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseCongig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBsuinessDetailById();
  }, []);

  const GetBsuinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusiness({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
    }
  };

  const renderContent = () => {
    return [
      { key: "intro", component: <Intro business={business} /> },
      { key: "action", component: <ActionButton business={business} /> },
      { key: "about", component: <About business={business} /> },
      { key: "reviews", component: <Reviews business={business} /> },
    ];
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          marginTop: "70%",
        }}
        size={"large"}
        color={Colors.primary}
      />
    );
  }

  return (
    <FlatList
      data={renderContent()}
      renderItem={({ item }) => <View key={item.key}>{item.component}</View>}
      keyExtractor={(item) => item.key}
    />
  );
}
