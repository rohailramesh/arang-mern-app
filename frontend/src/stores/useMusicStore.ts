import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { Song, Album } from "@/types";

interface MusicStore {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  albums: Album[];
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
      console.log(response.data);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
