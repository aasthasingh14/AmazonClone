import React, {  useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";  
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; 
import { UserType } from "../UserProvider"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddressScreen = () => {
    const navigation = useNavigation();
    const { userId } = useContext(UserType);

    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const handleAddAddress = async () => { 
      if (!userId) {
          try { 
              const storedUserId = await AsyncStorage.getItem('userId');
              if (storedUserId) { 
                  setUserId(storedUserId);
              } else {
                  console.error('No user ID found in AsyncStorage'); 
                  return;  
              }
          } catch (error) {
              console.error('Error fetching user ID from AsyncStorage:', error); 
              return;  
          }
      } 
      const addressData = {
          userId: userId,
          address: {
              name,
              mobileNo,
              houseNo,
              street,
              landmark,
              postalCode,
              country
          }
      };
  
      axios.post('http://192.168.29.169:5000/addresses', {userId, addressDa})
          .then((response) => {
              Alert.alert('Success', 'Address added successfully');
              setName('');
              setMobileNo('');
              setHouseNo('');
              setStreet('');
              setLandmark('');
              setPostalCode('');
              setCountry('');
  
              setTimeout(() => {
                  navigation.goBack();
              }, 500);
          })
          .catch((error) => {
              Alert.alert('Error', 'Failed to add address');
              console.error('error', error);
          });
  };
  return (
    <ScrollView style={{ marginTop: 30 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>

        <View style={{ marginVertical: 10 }}>
        

          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your name"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile numebr
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View>

          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area,Street,sector,village
          </Text>

          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Eg near appollo hospital"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Pincode"
          />
        </View>

        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Countrt</Text>
          <TextInput
            value={country}
            onChangeText={(text) => setCountry(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your name"
          /> 

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>


      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
