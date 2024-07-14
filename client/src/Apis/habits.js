import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {jwtDecode} from "jwt-decode";
const ipv4 = process.env.Ipv4 || '192.168.1.108:3000';

export const fetchHabits = async (navigation) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return Alert.alert('Could not find');
            navigation.navigate('Login')
        }  
        const response = await fetch(`http://${ipv4}/api/habits/byuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const responseJSON = response.json();
        return responseJSON;
    } catch (error) {
        return Alert.error("Error interno");
    }
}


export const createHabit = async (name,description, frequency, navigation) =>{
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('Could not find');
            navigation.navigate('habitHome');
            return;
        }   

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const requestData = {
            name,
            description,
            frequency: frequency.toLowerCase(),
            userId
        }
        const response = await fetch(`http://${ipv4}/api/habits/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        });

        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        Alert.alert('Error interno');
        console.log(error);
    }
}
