import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchHabits } from '../Apis/habits';

const ipv4 = process.env.Ipv4 || '192.168.1.108:3000';

const HomeHabitat = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () =>{
            const responseData = await fetchHabits(navigation);
            if(responseData.success){
                setHabits(responseData.data);
            }else{
                Alert.alert("Error al cargar sus habitos");
            }
            setLoading(false);
        };
        fetchData();
    },[]);


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
