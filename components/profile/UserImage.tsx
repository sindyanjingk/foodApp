import axios from "axios";
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { launchImageLibrary, Asset } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UserImage = ({
    username,
    email,
    image: initialImage,
}: {
    username: string;
    email: string;
    image?: string;
}) => {
    const [image, setImage] = useState<string | undefined>(initialImage);
    const [newImageUri, setNewImageUri] = useState<string | undefined>();
    const [pickedAsset, setPickedAsset] = useState<Asset | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);

    const pickImage = () => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.didCancel || response.errorMessage) {
                return;
            }

            const asset = response.assets?.[0];
            if (asset?.uri) {
                setNewImageUri(asset.uri);
                setPickedAsset(asset);
            }
        });
    };

    const uploadImage = async () => {
        if (!pickedAsset?.uri) return;

        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", {
            uri: pickedAsset.uri,
            name: pickedAsset.fileName ?? "avatar.jpg",
            type: pickedAsset.type ?? "image/jpeg",
            size : pickedAsset.fileSize
        } as any); // `as any` diperlukan karena React Native FormData masih longgar

        try {
            const res = await axios.put(
                "http://192.168.33.242:3000/api/avatar",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                setImage(res.data.url);
                setNewImageUri(undefined);
                setPickedAsset(null);
            }
        } catch (err: any) {
            console.error("Upload error:", err?.response || err.message);
            Alert.alert("Upload Error", "Failed to upload image.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={
                        newImageUri
                            ? { uri: newImageUri }
                            : image
                                ? { uri: image }
                                : require("../../assets/avatar-placeholder.png")
                    }
                    style={styles.avatar}
                />
            </TouchableOpacity>

            {newImageUri && (
                <TouchableOpacity onPress={uploadImage} style={styles.checkIcon}>
                    {isLoading ? (
                        <ActivityIndicator color={"green"} size={"small"} />
                    ) : (
                        //@ts-ignore
                        <Icon name="check-circle" size={28} color="green" />
                    )}
                </TouchableOpacity>
            )}

            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
        </View>
    );
};

export default UserImage;

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    checkIcon: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 2,
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1e1e1e",
    },
    email: {
        fontSize: 14,
        color: "#666",
    },
});
