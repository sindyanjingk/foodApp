import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { RootStackParamList } from '../types/types';
import axios from 'axios';

interface Option {
    label: string;
    value: string;
}

const kabupatenData: Option[] = [
    { label: 'Kabupaten Lampung Tengah', value: 'Lampung Tengah' },
];

const kecamatanData: Record<string, Option[]> = {
    "Lampung Tengah": [
        { "label": "Bangunrejo", "value": "Bangunrejo" },
        { "label": "Bekri", "value": "Bekri" },
        { "label": "Kalirejo", "value": "Kalirejo" },
        { "label": "Padang Ratu", "value": "Padang Ratu" },
        { "label": "Pubian", "value": "Pubian" },
        { "label": "Sendang Agung", "value": "Sendang Agung" },
    ],
};

const desaData: Record<string, Option[]> = {
    "Kalirejo": [
        { "label": "Agung Timur", "value": "Agung Timur" },
        { "label": "Balai Rejo", "value": "Balai Rejo" },
        { "label": "Kalidadi", "value": "Kalidadi" },
        { "label": "Kalirejo", "value": "Kalirejo" },
        { "label": "Kalisari", "value": "Kalisari" },
        { "label": "Kaliwungu", "value": "Kaliwungu" },
        { "label": "Ponco Warno", "value": "Ponco Warno" },
        { "label": "Sinar Rejo", "value": "Sinar Rejo" },
        { "label": "Sinar Sari", "value": "Sinar Sari" },
        { "label": "Sri Basuki", "value": "Sri Basuki" },
        { "label": "Sri Dadi", "value": "Sri Dadi" },
        { "label": "Sri Mulyo", "value": "Sri Mulyo" },
        { "label": "Sri Purnomo", "value": "Sri Purnomo" },
        { "label": "Sri Way Langsep", "value": "Sri Way Langsep" },
        { "label": "Suko Sari", "value": "Suko Sari" },
        { "label": "Watu Agung", "value": "Watu Agung" },
        { "label": "Way Krui", "value": "Way Krui" }
    ],
    "Bangunrejo": [
        { "label": "Bangun Rejo", "value": "Bangun Rejo" },
        { "label": "Cimarias", "value": "Cimarias" },
        { "label": "Mekar Jaya", "value": "Mekar Jaya" },
        { "label": "Purwodadi", "value": "Purwodadi" },
        { "label": "Sidodadi", "value": "Sidodadi" },
        { "label": "Sidoluhur", "value": "Sidoluhur" },
        { "label": "Sidomulyo", "value": "Sidomulyo" },
        { "label": "Sidorejo", "value": "Sidorejo" },
        { "label": "Sinar Luas", "value": "Sinar Luas" },
        { "label": "Sinar Seputih", "value": "Sinar Seputih" },
        { "label": "Sri Pendowo", "value": "Sri Pendowo" },
        { "label": "Suka Negeri", "value": "Suka Negeri" },
        { "label": "Sukanegara", "value": "Sukanegara" },
        { "label": "Sukawaringin", "value": "Sukawaringin" },
        { "label": "Tanjung Jaya", "value": "Tanjung Jaya" },
        { "label": "Tanjung Pandan", "value": "Tanjung Pandan" },
        { "label": "Timbulrejo", "value": "Timbulrejo" }
    ]
    ,
    "Padang Ratu": [
        { "label": "Bandar Sari", "value": "Bandar Sari" },
        { "label": "Haduyang Ratu", "value": "Haduyang Ratu" },
        { "label": "Karang Sari", "value": "Karang Sari" },
        { "label": "Kuripan", "value": "Kuripan" },
        { "label": "Margorejo", "value": "Margorejo" },
        { "label": "Mojokerto", "value": "Mojokerto" },
        { "label": "Karang Tanjung", "value": "Karang Tanjung" },
        { "label": "Kota Baru", "value": "Kota Baru" },
        { "label": "Padang Ratu", "value": "Padang Ratu" },
        { "label": "Purworejo", "value": "Purworejo" },
        { "label": "Purwosari", "value": "Purwosari" },
        { "label": "Sendang Ayu", "value": "Sendang Ayu" },
        { "label": "Sri Agung", "value": "Sri Agung" },
        { "label": "Sumber Sari", "value": "Sumber Sari" },
        { "label": "Surabaya", "value": "Surabaya" }
    ],
    "Sendang Agung": [
        { "label": "Kutowinangun", "value": "Kutowinangun" },
        { "label": "Sendang Agung", "value": "Sendang Agung" },
        { "label": "Sendang Asih", "value": "Sendang Asih" },
        { "label": "Sendang Asri", "value": "Sendang Asri" },
        { "label": "Sendang Baru", "value": "Sendang Baru" },
        { "label": "Sendang Mukti", "value": "Sendang Mukti" },
        { "label": "Sendang Mulyo", "value": "Sendang Mulyo" },
        { "label": "Sendang Rejo", "value": "Sendang Rejo" },
        { "label": "Sendang Retno", "value": "Sendang Retno" }
    ],
    "Pubian": [
        { "label": "Gunung Haji", "value": "Gunung Haji" },
        { "label": "Gunung Raya", "value": "Gunung Raya" },
        { "label": "Kota Batu", "value": "Kota Batu" },
        { "label": "Negeri Kepayungan", "value": "Negeri Kepayungan" },
        { "label": "Negri Ratu", "value": "Negri Ratu" },
        { "label": "Padang Rejo", "value": "Padang Rejo" },
        { "label": "Payung Batu", "value": "Payung Batu" },
        { "label": "Payung Dadi", "value": "Payung Dadi" },
        { "label": "Payung Makmur", "value": "Payung Makmur" },
        { "label": "Payung Mulya", "value": "Payung Mulya" },
        { "label": "Payung Rejo", "value": "Payung Rejo" },
        { "label": "Pekandangan", "value": "Pekandangan" },
        { "label": "Riau Priangan", "value": "Riau Priangan" },
        { "label": "Sangun Ratu", "value": "Sangun Ratu" },
        { "label": "Segala Mider", "value": "Segala Mider" },
        { "label": "Sinar Negeri", "value": "Sinar Negeri" },
        { "label": "Tanjung Kemala", "value": "Tanjung Kemala" },
        { "label": "Tanjung Rejo", "value": "Tanjung Rejo" },
        { "label": "Tawang Negeri", "value": "Tawang Negeri" },
        { "label": "Tias Bangun", "value": "Tias Bangun" }
    ]
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'AddressScreen'>;

const AlamatDropdown = () => {
    const route = useRoute<ProductDetailRouteProp>();
    const { userId } = route.params;
    const [kabupaten, setKabupaten] = useState<string>('');
    const [kecamatan, setKecamatan] = useState<string>('');
    const [desa, setDesa] = useState<string>('');
    const [keterangan, setKeterangan] = useState<string>('');
    const [kodePos, setKodePos] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false)

    const [filteredKecamatan, setFilteredKecamatan] = useState<Option[]>([]);
    const [filteredDesa, setFilteredDesa] = useState<Option[]>([]);

    useEffect(() => {
        setKecamatan('');
        setFilteredKecamatan(kecamatanData[kabupaten] || []);
    }, [kabupaten]);

    useEffect(() => {
        setDesa('');
        setFilteredDesa(desaData[kecamatan] || []);
    }, [kecamatan]);

    const navigation = useNavigation()

    const handleAddAddress = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`https://omjeki.vercel.app/api/address`, {
                userId,
                kabupaten,
                kecamatan,
                kelurahan : desa,
                keterangan,
                zip : kodePos,
            });
            if(response.status === 200) {
                navigation.navigate('Login' as never);
            }
        } catch (error:any) {
            console.error({error : error?.response});
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <ScrollView
        >
            <View style={styles.container}>
                <Text style={[styles.label, { marginBottom: 12 }]}>Sebelum melanjutkan, mohon atur alamat anda</Text>
                <Text style={styles.label}>Kabupaten</Text>
                <RNPickerSelect
                    onValueChange={(value) => setKabupaten(value)}
                    items={kabupatenData}
                    value={kabupaten}
                    placeholder={{ label: 'Pilih Kabupaten', value: null }}
                    style={pickerSelectStyles}
                />

                <Text style={styles.label}>Kecamatan</Text>
                <RNPickerSelect
                    onValueChange={(value) => setKecamatan(value)}
                    items={filteredKecamatan}
                    value={kecamatan}
                    placeholder={{ label: 'Pilih Kecamatan', value: null }}
                    disabled={!kabupaten}
                    style={pickerSelectStyles}
                />

                <Text style={styles.label}>Desa</Text>
                <RNPickerSelect
                    onValueChange={(value) => setDesa(value)}
                    items={filteredDesa}
                    value={desa}
                    placeholder={{ label: 'Pilih Desa', value: null }}
                    disabled={!kecamatan}
                    style={pickerSelectStyles}
                />

                <Text style={styles.label}>Kode Pos</Text>
                <TextInput
                    style={[styles.input]}
                    keyboardType='numeric'
                    placeholder="Kode Pos"
                    value={kodePos}
                    onChangeText={setKodePos}
                />

                <Text style={styles.label}>Keterangan</Text>
                <TextInput
                    placeholder="Contoh: RT 03 RW 01, belakang pasar"
                    value={keterangan}
                    onChangeText={setKeterangan}
                    style={styles.input}
                    multiline
                />

                <TouchableOpacity onPress={handleAddAddress} style={styles.registerButton}>
                    {
                        isLoading ?
                            <ActivityIndicator /> :
                            <Text style={{ color: 'white' }}>Lanjutkan</Text>
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        marginTop: 16,
        marginBottom: 4,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 60,
        textAlignVertical: 'top',
    },
    registerButton: {
        backgroundColor: '#4a3aff',
        paddingVertical: 14,
        borderRadius: 28,
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 80
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        marginBottom: 10,
    },
};

export default AlamatDropdown;
