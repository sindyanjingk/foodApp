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
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slice/authSlice';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }: any) => {
  // const handleGoogleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     Alert.alert('Login berhasil', `Halo, ${userInfo.user.name}`);
  //   } catch (error: any) {
  //     Alert.alert('Login gagal', error.message);
  //   }
  // };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }
    // Lakukan aksi login di sini
    console.log('Email:', email);
    console.log('Password:', password);

    setIsLoading(true)
    try {
      const response = await axios.post(`https://omjeki.vercel.app/api/auth/login`, {
        email,
        password
      })
      Alert.alert("Berhasil", "Login berhasil")
      if(response.status === 200) {
        dispatch(loginSuccess(response.data))
        navigation.navigate('Home')
      }
      console.log({response : response.data});
    } catch (error) {
      console.log({error});
      Alert.alert("Error", "Terjadi kesalahan");
    }
    setIsLoading(false)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masuk</Text>

      {/* Google Login */}
      <TouchableOpacity style={styles.socialButton} onPress={() => { }}>
        <Image
          source={require('../assets/icons/google.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Lanjutkan dengan Google</Text>
        <View style={{ width: 20 }}></View>
      </TouchableOpacity>

      {/* Apple Login */}
      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../assets/icons/apple.png')} // <- tambahkan logo Apple di folder assets
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Lanjutkan dengan Apple</Text>
        <View style={{ width: 20 }}></View>
      </TouchableOpacity>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" style={styles.inputIcon} />
        <TextInput onChangeText={e=>setEmail(e)} placeholder="Email" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.inputIcon} />
        <TextInput onChangeText={e=>setPassword(e)} placeholder="Password" secureTextEntry style={styles.input} />
      </View>

      <Text style={styles.forgotText}>Lupa Password?</Text>

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        {
          isLoading ?
            <ActivityIndicator size="small" color="#fff" />
            :
            <Text style={styles.loginText}>Masuk</Text>
        }
        {/* <Text style={styles.loginText}>Lanjutkan</Text> */}
      </TouchableOpacity>

      <Text style={styles.signupText}>Belum punya akun?</Text>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.signupButtonText}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
  forgotText: {
    alignSelf: 'flex-end',
    color: '#4a3aff',
    fontSize: 13,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#4a3aff',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  signupButton: {
    borderColor: '#4a3aff',
    borderWidth: 1,
    borderRadius: 28,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#4a3aff',
    fontSize: 16,
    fontWeight: '500',
  },
});
