import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import UserList from '../components/UserList';
import { auth } from '../firebaseConfig';

export default function Layout() {
  const [user, setUser] = useState<User | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bienvenido,</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Button title="Cerrar sesión" onPress={() => signOut(auth)} />
        <UserList />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showSignUp ? (
        <SignUp onSwitch={() => setShowSignUp(false)} />
      ) : (
        <SignIn onSwitch={() => setShowSignUp(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 30,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: '#444',
    marginBottom: 20,
  },
});
