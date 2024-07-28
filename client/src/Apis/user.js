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
export const UpdateUser = async (username, email, name, lastname, age) =>{
    try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
            Alert.alert('Could not find');
            return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await fetch(`http://${ipv4}/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({username, email, name, lastname, age})
        })
        const data = await response.json();
        if(data.success){
            Alert.alert('Éxito', 'Usuario actualizado exitosamente');
            return true;
        }
        Alert.alert('Error', 'No se pudo actualizar el usuario');
    } catch (error) {
        console.log(error.message)
    }
}

export const DeleteUser = async (id) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(!token){
            Alert.alert('Could not find');
            return;
        }
        const response = await fetch(`http://${ipv4}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        if(data.success){
            Alert.alert('Éxito', 'Usuario eliminado exitosamente');
            return true;
        }
        Alert.alert('Error', 'No se pudo eliminar el usuario');
    } catch (error) {
        console.log(error.message)
    }
}