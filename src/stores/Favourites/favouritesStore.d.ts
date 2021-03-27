interface ImageGiphy {
  type: string;
  id: string;
  url: string;
  username: string;
  title: string;
  rating: string;
  images: Images;
}

interface Images {
  fixed_height: FixedHeight;
}

interface FixedHeight {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface FavouritesState {
  initiated: boolean;
  dataFavourites: ImageGiphy[];
}

export { ImageGiphy, FavouritesState };
