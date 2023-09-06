import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { db } from '../configs/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import ButtonType from '../components/ButtonType';
import FooterBar from '../components/FooterBar';
import FeedListType from '../components/FeedListType';

const HomeScreen = ( {navigation} ) => {
    const [getData, setData] = useState([]);

    const onAuthStateChanged = async () => {
        const user = getAuth().currentUser;
        if (user) {
            const queryS = query(collection(db, 'users'), where('uid', '==', user.uid));
            const snapshot = await getDocs(queryS);

            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                setData(data);
            }
        }
    };

    const handleLogout = () => {
        getAuth().signOut()
        .then(() => {
            alert(`Você saiu da conta.`)
            navigation.navigate('LoginScreen')
        })
        .catch((error) => {
            alert(`Erro ao sair.`)
            console.log(error)
        });
    };

    useEffect(() => {
        onAuthStateChanged();
    }, [])

    return (
        <>
            <Animatable.View
                animation="fadeInUpBig"
                delay={100}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 30,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                        borderBottomWidth: 1,
                        borderBottomColor: '#000',
                        paddingBottom: 5,
                        fontWeight: 'bold',
                        width: '90%',
                        textAlign: 'center',
                    }}
                >
                    {getData['admin'] ? `Opa Meu Bom - "${getData['user'] ?? 'Admin'} (Admin)"` : `Welcome - "${getData['user'] ?? 'User'}"`}
                </Text>

                <View
                    style={{
                        width: '90%',
                        marginTop: 10,
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontStyle: 'italic',
                        }}
                    >
                        Email: {(getData['email'] ?? 'xxx@gmail.com')}
                    </Text>
                </View>

                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: '90%',
                            marginTop: 10,
                            marginBottom: 20,
                        }}
                    >
                        <ButtonType
                            onPress={() => handleLogout()}
                        >
                            Deslogar
                        </ButtonType>
                    </View>

                </View>
                
                <FeedListType admin={getData['admin']} />

            </Animatable.View>

            <Animatable.View
                animation="fadeIn"
                delay={100}
            >
                <FooterBar active={0} link={'PostImageScreen'} />
            </Animatable.View>
        </>
    );
};

export default HomeScreen;