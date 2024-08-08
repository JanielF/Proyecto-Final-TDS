import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const ipv4 = '192.168.1.108:3000';

export const LoginFunc = async (username, password) => {
    console.log('handle');
    try {
        const response = await fetch(`http://${ipv4}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const responseJson = await response.json();
        
        if (responseJson.success) {
            await AsyncStorage.setItem('token', responseJson.data);
            return responseJson;
        } else {
            return { success: false, message: responseJson.message };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const ChangePassword = async (newPassword) => {
    try {
        const token = await AsyncStorage.getItem('token'); 
        if (!token) {
            Alert.alert('Could not find token');
            return;
        }
        const response = await fetch(`http://${ipv4}/api/auth/changepassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newPassword }),
        });
        const data = await response.json();
        console.log(data);
        if(data.success){
            return data;
        } 
        else{
            return data;
        }
    } catch (error) {
        console.error(error.message);
    }
}
export const RegisterFunc = async (username, email,password,name,lastname, age) => {
    try {
        const response = await fetch('http://192.168.1.108:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            name: name,
            lastname: lastname,
            age: age,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
            return data;
        } else {
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
}