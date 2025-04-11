import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';

interface MapProps {
  markers: {
    title: string;
    id: string;
    coordinate: LatLng;
  }[];
  onMarkerPress: (id: string, title: string, coordinate: LatLng) => void;
  onLongPress: (coordinate: LatLng) => void;
}

export default function Map({ markers, onMarkerPress, onLongPress}: MapProps) 

{
  const mapRef = React.useRef<MapView>(null); 
  return (
    <View style={styles.container}>
      <MapView
      ref={mapRef}
      style={styles.map}
      onMapReady={() => {
        console.log('Карта успешно загружена');
      }}
      onLongPress={(event) => {
        const { coordinate } = event.nativeEvent;
        onLongPress(coordinate);
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          title={marker.title}
          coordinate={marker.coordinate}
          onPress={() =>
            onMarkerPress(marker.id, marker.title, marker.coordinate)
          }
        />
      ))}
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});