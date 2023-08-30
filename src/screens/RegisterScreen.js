import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {auth} from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
;

export default function RegisterScreen({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleRegister(){
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert('Usuário criado com sucesso!')
    }) .catch((error) =>  {
      alert('Erro ao criar usuário!')
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button title="Registrar" onPress={handleRegister} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 20,
    color: 'red',
  },
});