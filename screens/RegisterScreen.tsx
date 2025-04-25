import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Fa from 'react-native-vector-icons/FontAwesome';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const RegisterScreen = ({ navigation }: any) => {
  // const handleGoogleSignUp = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     Alert.alert('Registrasi berhasil', `Halo, ${userInfo.user.name}`);
  //   } catch (error: any) {
  //     Alert.alert('Gagal registrasi', error.message);
  //   }
  // };

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wa, setWa] = useState('');
  const registerAction = async () => {
    if (!username || !email || !password || !wa) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }
    // Lakukan aksi registrasi di sini
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Whatsapp:', wa);
    setIsLoading(true)
    try {
      const response = await axios.post(`https://omjeki.vercel.app/api/auth/register`, {
        name: username,
        email,
        password,
        wa,
      })
      console.log(response.data);
      Alert.alert('Berhasil', 'Registrasi berhasil');
      navigation.navigate('Login');
    } catch (error: any) {
      console.log({ error: error?.response });
      Alert.alert("Error", error?.response?.data?.error || "Terjadi kesalahan");
    }
    setIsLoading(false)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Ke Om Jeki</Text>

      {/* Google Signup */}
      <TouchableOpacity style={styles.socialButton} onPress={() => {

      }}>
        <Image
          source={require('../assets/icons/google.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Lanjutkan dengan Google</Text>
        <View style={{ width: 20 }}></View>
      </TouchableOpacity>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
        <TextInput onChangeText={e => setUsername(e)} placeholder="Username" style={styles.input} />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#888" style={styles.inputIcon} />
        <TextInput onChangeText={e => setEmail(e)} placeholder="Email" keyboardType="email-address" style={styles.input} />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
        <TextInput onChangeText={e => setPassword(e)} placeholder="Password" secureTextEntry style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Fa name="whatsapp" size={20} color="#888" style={styles.inputIcon} />
        <TextInput onChangeText={e => setWa(e)} placeholder="Whatsapp" style={styles.input} />
      </View>

      <Text style={[styles.loginPrompt, { color: "red" }]}>*Pastikan email dan whatsapp kamu aktif ya</Text>

      {/* Sign Up Button */}
      <TouchableOpacity onPress={registerAction} style={styles.registerButton}>
        {
          isLoading ?
            <ActivityIndicator /> :
            <Text style={styles.registerText}>Daftar</Text>
        }
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>Sudah punya akun?</Text>

      {/* Go to Login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginRedirect}>
        <Text style={styles.loginRedirectText}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 24 },
  socialButton: {
    borderWidth: 1,
    borderColor: '#4a3aff',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  socialText: {
    color: '#4a3aff',
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  or: {
    marginHorizontal: 8,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4a3aff',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginPrompt: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  loginRedirect: {
    borderColor: '#4a3aff',
    borderWidth: 1,
    borderRadius: 28,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginRedirectText: {
    color: '#4a3aff',
    fontSize: 16,
    fontWeight: '500',
  },
});
