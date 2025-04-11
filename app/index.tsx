import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Marker } from '@/types';
import Map from '@/components/Map';

export default function HomeScreen() {
  const [markers, addMarkers] = useState<Marker[]>([]);
  const router = useRouter();

  const handleLongPress = (coordinate: { latitude: number; longitude: number }) => {
    const newMarker: Marker = {
      id: Date.now().toString(),
      coordinate,
      title: `Место ${markers.length + 1}` || "Без названия",
    };
    addMarkers(prevMarkers => [...prevMarkers, newMarker]);
  };

  const handleMarkerPress = (id: string, title: string, coordinate: { latitude: number; longitude: number }) => {
    const { latitude, longitude } = coordinate;
    try {
    router.push(
      `/marker/${id}?title=${encodeURIComponent(title)}&latitude=${coordinate.latitude}&longitude=${coordinate.longitude}`
    );
  } catch (error) {
    console.error('Ошибка навигации:', error);
    alert('Произошла ошибка при переходе к маркеру.');
  }
  };

  return (
    <View style={styles.container}>
      <Map
        markers={markers}
        onLongPress={handleLongPress}     
        onMarkerPress = {handleMarkerPress}   
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
