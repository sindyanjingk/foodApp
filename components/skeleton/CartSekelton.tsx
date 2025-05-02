import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CartSkeleton = () => {
    return (
        <ScrollView style={styles.container}>
            <SkeletonPlaceholder borderRadius={10}>
                <View style={{
                    flexDirection :'column',
                    gap : 10
                }}>
                    <View style={styles.popularCard} />
                    <View style={styles.popularCard} />
                    <View style={styles.popularCard} />
                    <View style={styles.popularCard} />
                    <View style={styles.popularCard} />
                    <View style={styles.popularCard} />
                    <View style={styles.popularCard} />
                    <View style={styles.popularCard} />
                </View>
            </SkeletonPlaceholder>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#fff',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        width: 120,
        height: 20,
        marginBottom: 6,
    },
    location: {
        width: 80,
        height: 14,
    },
    searchBar: {
        marginTop: 20,
        width: '100%',
        height: 45,
        borderRadius: 22,
    },
    sectionTitle: {
        marginTop: 30,
        width: 180,
        height: 20,
    },
    exploreContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
    },
    exploreItem: {
        width: '48%',
        height: 120,
        borderRadius: 10,
    },
    popularContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
    },
    popularCard: {
        width: '90%',
        height: 120,
        alignSelf: 'center',
        borderRadius: 10,
    },
});

export default CartSkeleton;
