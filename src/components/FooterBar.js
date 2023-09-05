import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const FooterBar = ({active, link}) => {
    const navigation = useNavigation();

    const buttons = [
        {title: 'Feed', icon: 'apps', href: link},
        {title: 'Publicar', icon: 'arrow-up-circle', href: link},
    ];

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#000',
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignItems: 'center',
            }}
        >

            {buttons.map((e, index) => (
                <TouchableOpacity
                    onPress={() => (e.href !== '' ? navigation.navigate(e.href) : null)}
                    key={index}
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: active === index ? '#fff' : '#ccc',
                        padding: 5,
                        borderRadius: 2,
                        width: 80,
                    }}
                >
                    {e.icon !== '' ? <Ionicons name={e.icon} size={15} color="#000" /> : <></>}
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}
                    >
                        {e.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default FooterBar;