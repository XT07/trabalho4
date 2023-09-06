import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebase';

import InputType from '../components/InputType';
import ButtonType from '../components/ButtonType';


const LoginScreen = ({navigation}) => {
    const [getInputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleLogin = () => {
        if (getInputs['email'] !== '' && getInputs['password'] !== '') {
            signInWithEmailAndPassword(auth, getInputs['email'], getInputs['password'])
            .then(() => {
                navigation.navigate('HomeScreen')
                setInputs({
                    email: '',
                    password: '',
                })
            })
            .catch((error) => {
                alert(`Email ou senha incorretos`)
                console.log(error)
            });
        } else {
            alert('* preenche Tudo ai Cara.')
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('HomeScreen');
            }
        });
        return unsubscribe;
    }, [])

    return (
        <>
            <Animatable.View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 30,
                }}
            >
                <Animatable.Text
                    animation='fadeInRight'
                    delay={500}
                    style={{
                        fontSize: 30,
                        borderBottomWidth: 1,
                        borderBottomColor: '#000',
                        paddingBottom: 10,
                        fontWeight: 'bold',
                    }}
                >
                    Logar-se
                </Animatable.Text>

                <Animatable.View
                    animation='fadeInLeft'
                    delay={500}
                    style={{
                        width: '90%',
                        marginTop: 30,
                        marginBottom: 20,
                    }}
                >
                    <InputType
                        label='Email'
                        placeholder='Email'
                        keyboardType='email-address'
                        value={getInputs['email']}
                        onChangeText={(e) => setInputs({ ...getInputs, email: e })}
                    />
                </Animatable.View>

                <Animatable.View
                    animation='fadeInLeft'
                    delay={500}
                    style={{
                        width: '90%',
                        marginBottom: 20,
                    }}
                >
                    <InputType
                        label='Senha'
                        secureTextEntry={true}
                        value={getInputs['password']}
                        onChangeText={(e) => setInputs({ ...getInputs, password: e })}
                        placeholder='Senha'
                    />
                </Animatable.View>

                {/* <View
                    style={{
                        width: '90%',
                        marginVertical: 20,
                        alignItems: 'flex-end',
                    }}
                >
                    <Text
                        style={{
                            color: '#000',
                            fontWeight: 'bold',
                        }}
                    >
                        Esqueceu a senha ?
                    </Text>
                </View> */}

                <Animatable.View
                    animation='fadeInRight'
                    delay={500}
                    style={{
                        width: '90%',
                    }}
                >
                    <ButtonType
                        onPress={() => handleLogin()}
                    >
                        Entrar
                    </ButtonType>
                </Animatable.View>

                <Animatable.View
                    animation='fadeInUp'
                    delay={500}
                >
                    <Text
                        style={{
                            marginTop: 20,
                        }}
                    >
                        Não tem uma conta ? <Text onPress={() => navigation.navigate('RegisterScreen')} style={{ fontWeight: 'bold' }}>Cadastre-se.</Text>
                    </Text>
                </Animatable.View>
            </Animatable.View>
        </>
    );
};

export default LoginScreen;