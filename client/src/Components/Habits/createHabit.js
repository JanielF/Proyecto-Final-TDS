import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { createHabit } from '../../Apis/habits';
import CustomAlert from '../customAlert';
import background from '../../../assets/background.jpg';
import globalStyles from '../../../assets/css/globalCss';
const CreateHabit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ title: '', message: '', scree: ''});
    const handleCreateHabit = async () => {
        setLoading(true);
        try {
            const response = await createHabit(name, description, frequency, navigation);
            if(response.succes){
                setAlertVisible(true);
                setAlertMessage({title: 'Creado Correctamente', message: 'Hábito creado con éxito', screen: 'HomeHabit'});
            } else{
                setAlertVisible(true);
                setAlertMessage({title: 'Error', message: 'No se pudo crear el hábito', screen: ''});
            } 
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <ImageBackground source={background} style={globalStyles.background}>
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Crear Nuevo Hábito</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre del hábito</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del hábito"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Descripción del hábito</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Escribe la descripción del hábito"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Frecuencia del hábito</Text>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder={{
                        label: 'Selecciona la frecuencia',
                        value: null,
                    }}
                    value={frequency}
                    onValueChange={(value) => setFrequency(value)}
                    items={[
                        { label: 'Diario', value: 'daily' },
                        { label: 'Semanal', value: 'weekly' },
                        { label: 'Mensual', value: 'monthly' },
                    ]}
                />
            </View>

            <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateHabit}
                disabled={loading}
            >
                <Text style={styles.createButtonText}>
                    {loading ? 'Creando...' : 'Crear Hábito'}
                </Text>
            </TouchableOpacity>

            <CustomAlert 
                visible={alertVisible}
                title={alertMessage.title}
                message={alertMessage.message}
                onDismiss={() => setAlertVisible(false)}
                screen={alertMessage.screen}
            />
        </View>
        </ImageBackground>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        color: '#333333',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        width: 260,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        color: '#333333',
        paddingRight: 30,
        backgroundColor: '#ffffff',
     },
});

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    input: {
        borderWidth: 1,
        backgroundColor: '#ffffff',
        width: '90%',
        borderColor: '#cccccc',
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1a1a1a',
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top', 
    },
    createButton: {
        backgroundColor: '#6DACC8',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        width: '400'
    },
    createButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        width: 260,
        textAlign: 'center',
    },
});

export default CreateHabit;
