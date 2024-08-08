import React from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";
import globalStyles from "../../../assets/css/globalCss";

export default Paginator = ({ data, scrollX }) => {
    const {width} = useWindowDimensions();
    return(
        <View style={[globalStyles.paginator]}>
            {data.map((_, index) =>{
                const inputRange = [(index -1) * width, index * width, (index + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                });

                return <Animated.View style={[styles.dot, {width: dotWidth, opacity}]} key={index.toString()} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    transparentColor:{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#f783ac',
        marginHorizontal: 8
    }
})