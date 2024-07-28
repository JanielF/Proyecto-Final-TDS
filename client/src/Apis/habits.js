import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {jwtDecode} from "jwt-decode";
const ipv4 = process.env.Ipv4 || '192.168.1.108:3000';

export const fetchHabits = async (navigation) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('Could not find');
            return navigation.navigate('Login')
        }  
        const response = await fetch(`http://${ipv4}/api/habits/byuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const responseJSON = await response.json();
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
        }
        const response = await fetch(`http://${ipv4}/api/habits/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestData),
        });

        const responseJSON = await response.json();
        console.log(responseJSON);
        return responseJSON;
    } catch (error) {
        Alert.alert('Error interno');
        console.log(error);
    }
}
//Detalles de la aplicacion
export const DetailsHabit = async (id) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
            return Alert.alert('Could not find');
        }
        const response = await fetch(`http://${ipv4}/api/habits/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        return responseJSON;
    } catch (error) {
        console.log(error);
        return Alert.error("Error interno");
    }
}
//Eliminar
export const deleteHabit = async (id) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return;
        }

        const response = await fetch(`http://${ipv4}/api/habits/${id}`, {
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
//Update habito
export const updateHabit = async (idhabit, name, description, frequency) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('Error', 'No se encontró token de autenticación');
            navigation.navigate('Login');
            return false;
        }
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        console.log(userId)
        const response = await fetch(`http://${ipv4}/api/habits/${idhabit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                name, 
                description, 
                frequency, 
                userId }),
        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.succes) {
            Alert.alert('Éxito', 'Hábito actualizado exitosamente');
            return true;
        } else {
            console.error(responseData.message);
            Alert.alert('Error', `No se pudo actualizar el hábito: ${responseData.message}`);
            return false;
        }
    } catch (error) {
        Alert.alert('Error interno', 'Ocurrió un error al intentar actualizar el hábito');
        console.error(error);
        return false;
    }
};

export const completedHabit = async (id) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('Error', 'No se encontró token de autenticación');
            return false;
        }
        const response = await fetch(`http://${ipv4}/api/habits/completed/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if(!response.success){
            response.message = 'No se pudo marcar completado el habito';
            return response;
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

