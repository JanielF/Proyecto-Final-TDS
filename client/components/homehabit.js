import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ipv4 = process.env.Ipv4 || '192.168.1.108:3000';

const HomeHabitat = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Token no encontrado');
                    return;
                }
                const response = await fetch(`http://${ipv4}/api/habits/byuser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const responseData = await response.json();
                if (responseData.success) {
                    setHabits(responseData.data);
                } else {
                    Alert.alert('Error', responseData.message);
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);


    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => null, // Eliminar la flecha de retroceso
        });
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cargando hábitos...</Text>
            </View>
        );
    }

    if (habits.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No tienes hábitos</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CreateHabit')}
                >
                    <Text style={styles.buttonText}>Crear Hábito</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.habitContainer}>
                        <Text style={styles.habitName}>{item.name}</Text>
                        <Text style={styles.habitDescription}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconContainer: {
        padding: 10,
    },
    habitContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    habitName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    habitDescription: {
        fontSize: 14,
        color: '#555',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeHabitat;
