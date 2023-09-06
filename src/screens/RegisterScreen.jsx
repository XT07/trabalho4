import React, { useState } from 'react';
import { Text, View } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../configs/firebase';
import { addDoc, collection } from 'firebase/firestore';

import InputType from '../components/InputType';
import ButtonType from '../components/ButtonType';

const RegisterScreen = ( {navigation} ) => {
    const [getInputs, setInputs] = useState({
        email: '',
        password: '',
        user: '',
        confirmPassword: '',
        admin: false,
    });

    const handleRegister = () => {
        if (getInputs['email'] !== '' && getInputs['password'] !== '' && getInputs['user'] !== '' && getInputs['confirmPassword'] !== '') {
            
            if (getInputs['password'] !== getInputs['confirmPassword']) {
                alert('* As senhas não coincidem.')
                return;
            }

            createUserWithEmailAndPassword(auth, getInputs['email'], getInputs['password'])
            .then((e) => {
                addDoc(collection(db, 'users'), {
                    email: getInputs['email'],
                    user: getInputs['user'],
                    uid: e.user.uid,
                    date: new Date(),
                    admin: false,
                })
                .then(() => {
                    alert(`Conta cadastrada com sucesso.`)
                    navigation.navigate('HomeScreen')
                    setInputs({
                        email: '',
                        password: '',
                        user: '',
                        confirmPassword: '',
                        admin: false,
                    })
                })
                .catch((error) => {
                    alert(`Nao pode criar nada nao, Tu ta devendo.`)
                    console.log(error)
                })
            })
            .catch((error) => {
                alert(`Erro.`)
                console.log(error)
            });
        } else {
            alert('* Preenche Tudo ai cara')
        }
    };

    return (
        <>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingTop: 30,
                }}
            >
                <Animatable.Text
                    animation='fadeInLeft'
                    delay={500}
                    style={{
                        fontSize: 30,
                        borderBottomWidth: 1,
                        borderBottomColor: '#000',
                        paddingBottom: 10,
                        fontWeight: 'bold',
                    }}
                >
                    Cadastrar-se
                </Animatable.Text>

                <Animatable.View
                    animation='fadeInRight'
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
                    animation='fadeInRight'
                    delay={500}
                    style={{
                        width: '90%',
                    }}
                >
                    <InputType
                        label='Usuário'
                        value={getInputs['user']}
                        maxLength={10}
                        onChangeText={(e) => setInputs({ ...getInputs, user: e })}
                        placeholder='Usuário'
                    />
                </Animatable.View>

                <Animatable.View
                    animation='fadeInLeft'
                    delay={500}
                    style={{
                        width: '90%',
                        marginTop: 20,
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

                <Animatable.View
                    animation='fadeInLeft'
                    delay={500}
                    style={{
                        width: '90%',
                        marginTop: 20,
                        marginBottom: 30,
                    }}
                >
                    <InputType
                        label='Confirmar Senha'
                        secureTextEntry={true}
                        value={getInputs['confirmPassword']}
                        onChangeText={(e) => setInputs({ ...getInputs, confirmPassword: e })}
                        placeholder='Confirmar Senha'
                    />
                </Animatable.View>

                <Animatable.View
                    animation='fadeInRight'
                    delay={500}
                    style={{
                        width: '90%',
                    }}
                >
                    <ButtonType
                        onPress={() => handleRegister()}
                    >
                        Cadastrar
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
                        Já tem uma conta ? <Text onPress={() => navigation.navigate('LoginScreen')} style={{ fontWeight: 'bold' }}>Logar-se.</Text>
                    </Text>
                </Animatable.View>
            </View>
        </>
    );
};

export default RegisterScreen;