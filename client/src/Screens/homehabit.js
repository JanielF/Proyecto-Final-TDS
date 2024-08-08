import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchHabits } from '../Apis/habits';
import HabitList from '../Components/Habits/habitList';
import globalStyles from '../../assets/css/globalCss';
import background from '../../assets/background.jpg';
const HomeHabitat = () => {
    const [habits, setHabits] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
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
            setRefresh(false);
        }, [navigation, refresh])
    );
    const handleRefresh = () =>{
        setRefresh(true);
    }
    if (loading) {
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>Cargando hábitos...</Text>
            </View>
        );
    }
    return (
        <ImageBackground source={background} style={globalStyles.background}>
            <HabitList habits={habits} navigation={navigation} onRefresh={handleRefresh} />
        </ImageBackground>
    );
};

export default HomeHabitat;
