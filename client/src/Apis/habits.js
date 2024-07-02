import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const ipv4 = process.env.Ipv4 || '192.168.1.108:3000';

export const fetchHabits = async (navigation) => {
    try {
        const token = AsyncStorage.getItem('token');
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

        const requestData = {
            name,
            description,
            frequency,
        }
        const response = await fetch(`http://${ipv4}/api/habits`, {
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
    }
}
