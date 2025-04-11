import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import React from 'react';
import ImageList from '@/components/ImageList';
import * as ImagePicker from 'expo-image-picker';
import { useMarkerStore } from '@/types';

export default function MarkerDetailScreen() {
  const { id, title, latitude, longitude } = useLocalSearchParams<{
    id: string;
    title?: string;
    latitude?: string;
    longitude?: string;
  }>();

  const lat = latitude ? parseFloat(latitude) : undefined;
  const lng = longitude ? parseFloat(longitude) : undefined;

  const router = useRouter();
  const { imagesMap, addImage, removeImage } = useMarkerStore();

  const images = imagesMap[id!] || [];

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        addImage(id!, { uri: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Ошибка при выборе изображения:', error);
      Alert.alert('Ошибка', 'Не удалось выбрать изображение.');
    }
  };

  const handleDeleteImage = (uri: string) => {
    removeImage(id!, uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID Маркера: {id}</Text>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>
        Координаты: {"\n"}Широта: {lat}{"\n"}Долгота: {lng}
      </Text>
      <Button title="Добавить изображение" onPress={handleAddImage} />
      <ScrollView style={styles.imageList}>
        <ImageList images={images} onRemoveImage={handleDeleteImage} />
      </ScrollView>
      <Button title="Назад" onPress={() => router.back()} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#25292e',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a81e39',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 20,
  },
  imageList: {
    marginVertical: 20,
  },
});
