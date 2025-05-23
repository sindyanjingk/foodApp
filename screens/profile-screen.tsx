import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { openWhatsApp } from '../helpers/open-wa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { RootState } from '../store/store';
import UserImage from '../components/profile/UserImage';

type MenuItem = {
  id: string;
  icon: string;
  label: string;
  action?: () => void;
};



const ProfileScreen = () => {

  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => state.profile)

  const menuItems: MenuItem[] = [
    { id: '1', icon: 'user', label: 'Edit Profil', action: () => { } },
    { id: '2', icon: 'map-pin', label: 'Ubah Alamat', action: () => { } },
    // { id: '3', icon: 'lock', label: 'Ubah Password', action: () => { } },
    { id: '4', icon: 'help-circle', label: 'Pusat Bantuan', action: () => { } },
    { id: '5', icon: 'info', label: 'Tentang Kami', action: () => { } },
    {
      id: '6', icon: 'log-out', label: 'Keluar', action: () => {
        dispatch(logout())
      }
    },
  ];

  const renderItem: ListRenderItem<MenuItem> = ({ item, index }) => (
    <TouchableOpacity onPress={item.action} style={[styles.item, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}>
      <View style={styles.itemContent}>
        {/* @ts-ignore */}
        <Icon name={item.icon} size={20} color="#4a3aff" />
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
      {/* @ts-ignore */}
      <Icon name="chevron-right" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <UserImage username={profile.name} email={profile.email} image={profile.avatar} />

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e1e1e',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 24,
    backgroundColor: '#f8f8ff',
    borderRadius: 16,
    marginHorizontal: 24,
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#1e1e1e',
  },
});
