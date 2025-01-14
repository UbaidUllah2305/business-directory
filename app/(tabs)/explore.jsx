import { FlatList, TextInput, View, Text } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Category from "../../components/Home/Category";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseCongig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
  const [businessList, setBusinessList] = useState([]);

  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  const renderHeader = () => (
    <>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>
        Explore More
      </Text>

      {/* Search Bar */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 10,
                marginVertical: 10,
                marginTop: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.primary,
              }}
            >
              <Ionicons name="search" size={24} color={Colors.primary} />
              <TextInput
                placeholder="Search..."
                style={{ fontFamily: "outfit", fontSize: 16 }}
              />
            </View>

      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(category) => GetBusinessByCategory(category)}
      />
    </>
  );

  const renderEmptyList = () => (
    <Text style={{ fontFamily: "outfit", fontSize: 16, textAlign: "center", marginTop: 20 }}>
      No Business Available
    </Text>
  );

  return (
    <FlatList
      data={businessList}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <ExploreBusinessList businessList={[item]} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20, marginTop: 30 }}
      ListEmptyComponent={renderEmptyList} // Show when the list is empty
    />
  );
}
