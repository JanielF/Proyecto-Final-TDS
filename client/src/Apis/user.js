import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
const ipv4 = process.env.Ipv4 || '192.168.1.108:3000';


export const DetailsUser = async (navigation) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
            Alert.alert('Could not find');
            navigation.navigate('Login');
            return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await fetch(`http://${ipv4}/api/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseJSON = response.json();
        return responseJSON;
    } catch (error) {
        console.log(error);
        return Alert.error("Error interno");
    }
}
