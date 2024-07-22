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
export const DetailsHabit = async (id) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
            return Alert.alert('Could not find');
        }
        const response = await fetch(`http://${ipv4}/api/habits/habit/${id}`, {
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
export const deleteHabit = async (id, navigation) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('No se encontró token');
            navigation.navigate('Login');
            return;
        }

        const response = await fetch(`http://${ipv4}/api/habits/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            Alert.alert('Éxito', 'Hábito eliminado exitosamente');
            return true;
        } else {
            Alert.alert('Error', 'No se pudo eliminar el hábito');
            return false;
        }
    } catch (error) {
        Alert.alert('Error interno', 'Ocurrió un error al intentar eliminar el hábito');
        console.log(error);
        return false;
    }
};

export const updateHabit = async (id, updatedHabit, navigation) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('Error', 'No se encontró token de autenticación');
            navigation.navigate('Login');
            return false;
        }

        const response = await fetch(`http://${ipv4}/api/habits/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedHabit),
        });
        if (response.success) {
            const responseData = await response.json();
            Alert.alert('Éxito', 'Hábito actualizado exitosamente');
            return true;
        } else {
            const errorData = await response.json();
            Alert.alert('Error', `No se pudo actualizar el hábito: ${errorData.message}`);
            return false;
        }
    } catch (error) {
        Alert.alert('Error interno', 'Ocurrió un error al intentar actualizar el hábito');
        console.error(error);
        return false;
    }
};

