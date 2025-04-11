import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

export interface Marker {
  id: string;
  coordinate: LatLng;
  title: string;
  images?: typeof Image[];
}

interface Image {
  uri: string;
}

interface MarkerImagesState {
  imagesMap: Record<string, Image[]>;
  addImage: (markerId: string, image: Image) => void;
  removeImage: (markerId: string, uri: string) => void;
}

export const useMarkerStore = create<MarkerImagesState>((set) => ({
  imagesMap: {},
  addImage: (markerId, image) =>
    set((state) => ({
      imagesMap: {
        ...state.imagesMap,
        [markerId]: [...(state.imagesMap[markerId] || []), image],
      },
    })),
  removeImage: (markerId, uri) =>
    set((state) => ({
      imagesMap: {
        ...state.imagesMap,
        [markerId]: (state.imagesMap[markerId] || []).filter(
          (img) => img.uri !== uri
        ),
      },
    })),
}));