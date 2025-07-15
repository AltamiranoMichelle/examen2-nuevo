import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

type Props = {
  onSwitch: () => void;
};

export default function SignUp({ onSwitch }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      // Guardar el usuario en Firestore (opcional para evidencia)
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
      });
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        setError('El correo ya está registrado.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Correo inválido.');
      } else if (e.code === 'auth/weak-password') {
        setError('La contraseña es muy débil.');
      } else {
        setError('Error al registrar. Intente de nuevo.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
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
      <Button title="Registrar" onPress={handleSignUp} />
      <Text style={styles.switchText}>
        ¿Ya tienes cuenta?{' '}
        <Text style={styles.link} onPress={onSwitch}>
          Inicia sesión aquí
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
