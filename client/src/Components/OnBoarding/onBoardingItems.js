import React from "react";
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import globalStyles from "../../../assets/css/globalCss";
export default onBoardingItems = ({item}) => {
    const {width} = useWindowDimensions();

    return(
        <View style={[globalStyles.container, {width}]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]} />
        	
            <View style={{flex: 0.3}}>
                <Text style={globalStyles.title}>{item.title}</Text>
                <Text style={globalStyles.description}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
      image: {
        flex: 0.7,
        justifyContent: 'center',
      },
})
