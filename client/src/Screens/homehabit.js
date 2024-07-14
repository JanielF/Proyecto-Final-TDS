import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchHabits } from '../Apis/habits';
import HabitList from '../Components/Habits/habitList';

const HomeHabitat = () => {
    const [habits, setHabits] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); 

    const fetchData = async() =>{
        try{ 
            const responseData = await fetchHabits(navigation);
            if(responseData.success){
                setHabits(responseData.data);
            }
            else{
                Alert.alert("Error al cargar sus habitos");
            }
        }
        catch(error){
            Alert.alert("Error al cargar sus habitos");
            setLoading(false);
        }finally{
            setLoading(false);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [navigation])
    );
    // Mostrar mensaje de carga
    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cargando hábitos...</Text>
            </View>
        );
    }
    return (
        <HabitList habits={habits} navigation={navigation} />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});




export default HomeHabitat;
