import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [serverMessage, setServerMessage] = useState("Waiting for server...");

  // This is the actual Fetch call
  const pingServer = async () => {
    try {
      // 1. Throw the request to your exact secure URL
      const response = await fetch('https://20.2.198.46.nip.io/db-status');
      
      // 2. Unpack the JSON response the server sent back
      const data = await response.json();
      
      // 3. Update the UI with the message
      setServerMessage(data.message);
    } catch (error) {
      console.error("Network request failed:", error);
      setServerMessage("Failed to connect to the backend.");
    }
  };

  return (
    
      <View style={styles.container}>
        <Text style={styles.text}>{serverMessage}</Text>
        <TouchableOpacity style={{borderColor:'black', padding: 10,borderWidth: 1,}} onPress={pingServer}>
          <Text style={styles.text}>This is a major change</Text>
        </TouchableOpacity>
      </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  text: { marginBottom: 20, fontSize: 16, fontWeight: 'bold' }
});