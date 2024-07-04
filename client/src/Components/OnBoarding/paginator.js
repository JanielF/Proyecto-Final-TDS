import React from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

export default Paginator = ({ data, scrollX }) => {
    const {width} = useWindowDimensions();
    return(
        <View style={{ flexDirection: 'row', height: 64}}>
            {data.map((_, index) =>{
                const inputRange = [(index -1) * width, index * width, (index + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    // extrapolate: 'clamp',
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
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8
    }
})