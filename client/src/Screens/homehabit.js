import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
<<<<<<< HEAD:client/src/Screens/homehabit.js
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchHabits } from '../Apis/habits';
=======
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
>>>>>>> f6c61990e16ea687a7bd43d111781dde6defdebe:client/components/homehabit.js

// Importar los módulos necesarios

// Componente principal
const HomeHabitat = () => {
    const [habits, setHabits] = useState([]); // Estado para almacenar los hábitos
    const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga
    const navigation = useNavigation(); // Obtener la navegación

    // Obtener los hábitos al cargar el componente
    useEffect(() => {
<<<<<<< HEAD:client/src/Screens/homehabit.js
        const fetchData = async () =>{
            const responseData = await fetchHabits(navigation);
            if(responseData.success){
                setHabits(responseData.data);
            }else{
                Alert.alert("Error al cargar sus habitos");
=======
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); // Obtener el token del almacenamiento
                if (!token) {
                    Alert.alert('Token no encontrado'); // Mostrar una alerta si no se encuentra el token
                    return;
                }
                const response = await fetch(`http://10.0.0.15:3000/api/habits/byuser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Agregar el token a los encabezados de la solicitud
                    },
                });

                const responseData = await response.json(); // Obtener los datos de respuesta
                if (responseData.success) {
                    setHabits(responseData.data); // Actualizar los hábitos con los datos recibidos
                } else {
                    Alert.alert('Error', responseData.message); // Mostrar una alerta si hay un error en la respuesta
                }
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('Error', error.message); // Mostrar una alerta si hay un error en la solicitud
            } finally {
                setLoading(false); // Finalizar la carga
>>>>>>> f6c61990e16ea687a7bd43d111781dde6defdebe:client/components/homehabit.js
            }
            setLoading(false);
        };
        fetchData();
<<<<<<< HEAD:client/src/Screens/homehabit.js
    },[]);

=======
    }, []);

    // Configurar opciones de navegación al cargar el componente
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => null, // Eliminar la flecha de retroceso
        });
    }, [navigation]);
>>>>>>> f6c61990e16ea687a7bd43d111781dde6defdebe:client/components/homehabit.js

    // Mostrar mensaje de carga
    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cargando hábitos...</Text>
            </View>
        );
    }

    // Mostrar mensaje si no hay hábitos
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

    // Resumen de hábitos
    const habitSummary = {
        total: habits.length,
        active: habits.filter(habit => habit.active).length,
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Gestión de Hábitos</Text>
                <Text style={styles.subtitle}>
                    Administra y monitorea tus hábitos diarios para mejorar tu estilo de vida.
                </Text>
            </View>

            <View style={styles.summary}>
                <Text style={styles.summaryText}>Resumen de Hábitos</Text>
                <Text style={styles.summaryItem}>Total de hábitos: {habitSummary.total}</Text>
                <Text style={styles.summaryItem}>Hábitos activos: {habitSummary.active}</Text>
            </View>

            <View style={styles.importantInfo}>
                <Text style={styles.importantInfoTitle}>Información Importante</Text>
                <Text style={styles.importantInfoText}>
                    Recordatorio: ¡Los hábitos son esenciales para alcanzar tus metas a largo plazo!
                </Text>
                <Text style={styles.importantInfoText}>
                    Tip: Mantén un registro diario para monitorear tu progreso y ajustar tus estrategias.
                </Text>
                <Text style={styles.importantInfoText}>
                    Beneficio: Establecer buenos hábitos puede mejorar significativamente tu salud mental y física.
                </Text>
            </View>

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('CreateHabit')}
            >
                <Text style={styles.createButtonText}>Crear Nuevo Hábito</Text>
            </TouchableOpacity>

            <FlatList
                data={habits}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <HabitCard
                        title={item.name}
                        description={item.description}
                    />
                )}
            />
        </ScrollView>
    );
};

// Componente para mostrar un hábito
function HabitCard({ title, description }) {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDescription}>{description}</Text>
            </View>
            <View style={styles.cardActions}>
                <Button title="Activar" onPress={() => {}} />
                <IconButton icon="edit" onPress={() => {}} />
                <IconButton icon="delete" onPress={() => {}} />
            </View>
        </View>
    );
}

// Componente para mostrar un botón
function Button({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

// Componente para mostrar un botón con icono
function IconButton({ icon, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.iconButton}>
            <Icon name={icon} />
        </TouchableOpacity>
    );
}

// Componente para mostrar un icono
function Icon({ name }) {
    switch (name) {
        case 'edit':
            return <FilePenIcon />;
        case 'delete':
            return <Trash2Icon />;
        default:
            return null;
    }
}

// Componente para mostrar el icono de edición
function FilePenIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    );
}

// Componente para mostrar el icono de eliminación
function Trash2Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f9fc',
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        color: '#6b7280',
        fontSize: 16,
    },
    summary: {
        backgroundColor: '#e5e7eb',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    summaryText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    summaryItem: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    importantInfo: {
        backgroundColor: '#fff5e6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    importantInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#d97706',
    },
    importantInfoText: {
        fontSize: 16,
        color: '#d97706',
        marginBottom: 4,
    },
    createButton: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 4,
    },
    cardDescription: {
        color: '#6b7280',
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconButton: {
        marginLeft: 12,
    },
});

export default HomeHabitat;
