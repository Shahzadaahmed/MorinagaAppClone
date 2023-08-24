// Note: SplashScreen component...!

import React, { useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
}
    from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashCover from "../asset/splash-cover.jpg";

// Note: Height and Width according to the device...!
const { height, width } = Dimensions.get("window");

const SplashScreen = () => {

    // Note: Handeling navigation here...!
    const navigation = useNavigation();

    // Note: When this component mounted then this hook will run...!
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("SignIn");
        }, 3000);
    }, []);

    return (
        <>
            <ImageBackground
                source={SplashCover}
                style={styles.coverImage}
                resizeMode={'cover'}
            />
        </>
    );
};

// Note: Handleing styling here...!
const styles = StyleSheet.create({
    coverImage: {
        height: height,
        width: width,
        resizeMode: "cover"
    },
});

export default SplashScreen;