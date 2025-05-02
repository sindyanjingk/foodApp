import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { formatIdr } from '../helpers/formatIdr';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Review {
    id: string;
    username: string;
    rating: number;
    review: string;
}

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<ProductDetailRouteProp>();
    const { name, image, price, rating, time, id } = route.params;
    const [reviews] = useState<Review[]>([
        { id: '1', username: 'John Doe', rating: 4.5, review: 'Great dish! The spices were just right.' },
        { id: '2', username: 'Jane Smith', rating: 5, review: 'Absolutely loved it! Will order again.' },
        { id: '3', username: 'Alex Brown', rating: 3.5, review: 'It was good, but I prefer less spicy.' },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const renderReview = ({ item }: { item: Review }) => (
        <View style={styles.reviewContainer}>
            <Text style={styles.reviewUsername}>{item.username}</Text>
            <View style={styles.ratingRow}>
                {[...Array(5)].map((_, index) => (
                    //@ts-ignore
                    <Icon
                        key={index}
                        name="star"
                        size={16}
                        color={index < Math.floor(item.rating) ? '#FFD700' : '#E0E0E0'}
                    />
                ))}
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <Text style={styles.reviewText}>{item.review}</Text>
        </View>
    );

    const renderHeader = () => (
        <View>
            {/* Details Section */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{name || ""}</Text>
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{time || ""}</Text>
                    {/* @ts-ignore */}
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.metaText}>{rating || ""}</Text>
                </View>

                <Text style={styles.price}>{formatIdr(price || 0)}</Text>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                    Chicken Masala is a delicious spicy Indian curry dish made with tender
                    chicken pieces cooked in a rich and flavorful tomato-based sauce with
                    aromatic spices and herbs. Perfect to enjoy with naan or rice.
                </Text>

                <Text style={styles.sectionTitle}>Rating & Reviews</Text>
            </View>
        </View>
    )

    const token = useSelector((state: RootState) => state.auth.token)

    const handleAddTocart = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`https://omjeki.vercel.app/api/cart`, {
                products: [{
                    productId: id,
                    quantity: 1
                }]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                navigation.navigate('Cart' as never)
            }
        } catch (error) {
            console.log({ error });
        }
        setIsLoading(false)
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* Header Image */}
            <View style={styles.imageContainer}>
                {
                    image ?
                        <Image
                            source={{ uri: image }}
                            style={styles.mainImage}
                        /> :
                        <Image
                            source={require('../assets/foods/nasgor.png')}
                            style={styles.mainImage}
                        />
                }
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    {/* @ts-ignore */}
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>



            {/* Reviews List */}
            <FlatList
                data={reviews}
                renderItem={renderReview}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
            />

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
            }}>
                {/* Add to Cart Button */}
                <TouchableOpacity onPress={() => navigation.navigate(`CheckoutScreen` as never)} style={styles.buyNowButton}>
                    <Text style={styles.buttonText}>Beli Sekarang</Text>
                </TouchableOpacity>
                {/* Add to Cart Button */}
                <TouchableOpacity onPress={handleAddTocart} style={styles.addToCartButton}>
                    {
                        isLoading ?
                            <ActivityIndicator color={"#FFF"} size={"small"} /> :
                            <Text style={styles.buttonText}>Tambah Ke Keranjang</Text>
                    }
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: 260,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        elevation: 4,
    },
    detailsContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    metaText: {
        marginRight: 8,
        color: '#666',
        fontSize: 14,
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: '#5D3BEE',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#444',
        marginBottom: 16,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 80,
    },
    reviewContainer: {
        marginBottom: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
    },
    reviewUsername: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        marginLeft: 8,
        color: '#888',
        fontSize: 14,
    },
    reviewText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    addToCartButton: {
        backgroundColor: '#5D3BEE',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        margin: 8,
        width: '56%',
    },
    buyNowButton: {
        backgroundColor: '#5D3BEE',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        margin: 8,
        width: '38%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});