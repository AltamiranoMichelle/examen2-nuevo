import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { db } from '../firebaseConfig';

export default function UserList() {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const emails: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.email) emails.push(data.email);
        });
        setUsers(emails);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios registrados:</Text>
      <ScrollView style={styles.scroll}>
        {users.map((email, index) => (
          <Text key={index} style={styles.email}>{email}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scroll: {
    maxHeight: 150,
    width: '100%',
    paddingHorizontal: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
});
