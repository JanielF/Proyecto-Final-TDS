import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../assets/css/globalCss';
const CustomAlert = ({ visible, title, message, onDismiss, screen }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        if(screen){
            navigation.navigate(screen);
        }
        onDismiss();
    }
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <FontAwesome name="check" size={24} color="white" />
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#C1D7E1',
        borderRadius: 20,
        padding: 35,
        width: '80%',
        height: '35%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        marginBottom: 15,
        textAlign: 'center',
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        color: '#293d3d',
        marginBottom: 15,
        marginTop: 8
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#6DACC8',
        borderRadius: 10,
        marginTop: 35,
        width: 100,
        textAlign: 'center',
        padding: 10,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        marginLeft: 8,
        alignItems: 'center',
    },
});

export default CustomAlert;
