import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Feed");
      })
      .catch((error) => {
        setMessage("Email ou senha incorretos");
      });
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrar" onPress={() => {navigation.navigate("Register")}} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 20,
    color: "red",
  },
});

