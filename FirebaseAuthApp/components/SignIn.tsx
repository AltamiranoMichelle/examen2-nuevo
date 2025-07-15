import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../firebaseConfig';

type Props = {
  onSwitch: () => void;
};

export default function SignIn({ onSwitch }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        setError('No existe una cuenta con ese correo.');
      } else if (e.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta.');
      } else {
        setError('Error al iniciar sesión. Intente de nuevo.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleSignIn} />
      <Text style={styles.switchText}>
        ¿No tienes cuenta?{' '}
        <Text style={styles.link} onPress={onSwitch}>
          Regístrate aquí
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  error: { color: 'red', marginBottom: 10 },
  switchText: { marginTop: 15, textAlign: 'center' },
  link: { color: 'blue' },
});
