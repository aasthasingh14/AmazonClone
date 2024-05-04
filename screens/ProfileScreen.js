import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, [navigation]);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("LogIn");
  };

  const [orders, setOrders] = useState([]);
 
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch("http://192.168.77.185:5000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else { 
        console.error("Failed to fetch orders:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteItem = async (orderId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `http://192.168.77.185:5000/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) { 
        fetchOrders();
      } else { 
        console.error("Failed to delete item:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
 
  const handleUpdateQuantity = async (orderId, productId, newQuantity) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `http://192.168.77.185:5000/orders/${orderId}/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (response.ok) { 
        setOrders((prevOrders) => {
          const updatedOrders = prevOrders.map((order) => {
            if (order._id === orderId) {
              const updatedProducts = order.products.map((product) => {
                if (product._id === productId) {
                  return { ...product, quantity: newQuantity };
                }
                return product;
              });
              return { ...order, products: updatedProducts };
            }
            return order;
          });
          return updatedOrders;
        });
      } else { 
        console.error("Failed to update quantity:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
 
  const confirmUpdateQuantity = async (orderId, productId, newQuantity) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `http://192.168.77.185:5000/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: newQuantity }),
        }
      );
      if (response.ok) { 
        fetchOrders();
      } else { 
        console.error("Failed to update quantity:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome User</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your orders</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>

      {orders.map((order) => (
        <View key={order._id} style={styles.orderContainer}>
          <View style={{ marginTop: 10 }}>
            <Text style={{fontSize: 18, fontWeight: "600"}}>Total Price: {order.totalPrice}</Text>
            <Text>Payment Method: {order.paymentMethod}</Text>
            <Pressable
              onPress={() => handleDeleteItem(order._id)}
              style={styles.deleteButton}
            >
              <Text style={{ color: "white" }}>Delete Order</Text>
            </Pressable>
          </View>
 
          {order.products.map((product) => (
            <View key={product._id} style={styles.productContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Text style={{fontSize: 15, fontWeight:"400"}}>{product.name}</Text>
                  <Text style={{ color: "green" , fontSize:18, fontWeight:"500"}}>{product.price}</Text>
                  <Text style={{fontSize: 17, fontWeight:"300"}}>Quantity : {product.quantity}</Text>
                </View>
              </View>
 
              <View style={styles.quantityContainer}>
                <Pressable
                  onPress={() =>
                    handleUpdateQuantity(
                      order._id,
                      product._id,
                      product.quantity - 1
                    )
                  }
                  style={styles.quantityButton}
                >
                  <Text>-</Text>
                </Pressable>
                <Text>{product.quantity}</Text>
                <Pressable
                  onPress={() => {
                    handleUpdateQuantity(
                      order._id,
                      product._id,
                      product.quantity + 1
                    );
                    confirmUpdateQuantity(
                      order._id,
                      product._id,
                      product.quantity + 1
                    );
                  }}
                  style={styles.quantityButton}
                >
                  <Text>+</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  orderContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  productContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    padding: 10, 
    backgroundColor: "#E0E0E0",
    borderRadius: 5,  
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  
});
