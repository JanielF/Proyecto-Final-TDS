import React, { useRef, useState } from "react";
import { Animated, FlatList, ImageBackground, StyleSheet, View } from "react-native";
import itemsboarding from "./itemsboarding";
import NextButton from "./nextButton";
import OnBoardingItems from "./onBoardingItems";
import Paginator from "./paginator";
import globalStyles from "../../../assets/css/globalCss";
import background from "../../../assets/background.jpg"
export default OnBoarding = () =>{
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const viewItemsChanged = useRef(( { viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const slideRef = useRef(null);

    return(
        <ImageBackground source={background} style={globalStyles.background}>
            <View style={globalStyles.container}>
            <View style={{flex: 3}}>
                <FlatList
                    data={itemsboarding}
                    renderItem={({item}) => <OnBoardingItems item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator= {false}
                    pagingEnabled
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: {contentOffset: {x: scrollX} } }],{
                        useNativeDriver: false,
                    })}

                    onViewableItemsChanged={viewItemsChanged}
                    viewableConfig={viewConfig}
                />
            </View>

            <Paginator  data={itemsboarding} scrollX={scrollX} />
            <NextButton percentage={(currentIndex + 1) * (100 / itemsboarding.length)}/>
        </View>
        </ImageBackground>
    )
}
