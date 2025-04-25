import { Alert, Linking } from "react-native";

export const openWhatsApp = () => {
    const phoneNumber = '6281315805251'; // Ganti dengan nomor tujuan
    const message = 'Halo! Saya ingin bertanya sesuatu.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('WhatsApp tidak terpasang di perangkat ini');
        }
      })      .catch((err) => console.error('Terjadi kesalahan:', err));
  };