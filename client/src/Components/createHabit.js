import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createHabit } from './src/api/api';

const CreateHabitScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateHabit = async () => {
        if (!name || !description || !frequency) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        const responseData = await createHabit(name, description, frequency);
        setLoading(false);

        if (responseData.success) {
            Alert.alert('Éxito', 'Hábito creado correctamente');
            // Navegar a la pantalla deseada después de crear el hábito
        } else {
            Alert.alert('Error', responseData.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Hábito</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del hábito"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Frecuencia"
                value={frequency}
                onChangeText={setFrequency}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateHabit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Creando...' : 'Crear Hábito'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CreateHabitScreen;
