import { get } from 'lodash';
import React from 'react';
import { Media } from 'reactstrap';
import { GridImageProps } from './GridImage.d';
import './GridImage.scss';

import HEART from '../../assets/images/heart3.png';
import { ImageGiphy } from 'stores/Favourites/favouritesStore.d';
import useFavourites from 'stores/Favourites/favouritesStore';
import { notify } from 'components/toast/Toast';

const GridImage: React.FC<GridImageProps> = ({ listImage }) => {
  const [stateFavourites, actionStateFavourites] = useFavourites();
  const onLike = (item: ImageGiphy) => {
    const liked = stateFavourites.dataFavourites?.filter((image) => image.id.includes(item.id)).length > 0;
    try {
      if (liked) return actionStateFavourites.removeImageFromFavourites(item);

      return actionStateFavourites.addImageToFavourites(item);
    } catch (e) {
    } finally {
      notify.success(liked ? 'Unliked!' : 'Liked!');
    }
  };

  return (
    <div className="grid-image">
      <div className="row imagetiles">
        {listImage?.map((item) => {
          const url = get(item, 'images.fixed_height.url', '');
          const liked = stateFavourites.dataFavourites?.filter((image) => image.id.includes(item.id)).length > 0;
          return (
            <div
              key={item.id}
              className="container col-lg-3 col-md-3 col-sm-3 col-xs-6 mt-3"
              onClick={() => onLike(item)}
            >
              <Media className="media" object src={url} width={200} height={200} />
              <Media className={`${!liked ? 'middle' : 'middle-liked'}`} object src={HEART} width={40} height={30} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GridImage;
