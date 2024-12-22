import s from './star.module.scss'

import { Icons } from "../SVGIcons/icons";
import { useSelector, useDispatch } from "react-redux";
import { getFavCoins } from "../../redux/coins/coins-selector";
import { addToFavorite } from '../../redux/coins/coins-slice';
import { coinsAPI } from '../../api/coinsAPI';
import { memo } from 'react';

const StarButton: React.FC<{pair: string, size: string}> = ({pair, size}) => {
    const dispatch = useDispatch()
    const {favs} = useSelector(getFavCoins)
   
    const isFavorite = (favs || []).includes(pair)

    const onPairSelect = () => {
      const coinsPair = pair.split('/').join('-')
        dispatch(addToFavorite(pair))
        if (isFavorite) {
          coinsAPI.removePairFromFavorites(coinsPair)
        } else {
          coinsAPI.addPairToFavorites(coinsPair)
        }
    }

  return (
    <span onClick={onPairSelect} className={isFavorite? s.icon_fav : s.icon}>
      <Icons.StarIcon width={size} height={size}/>
    </span>
  );
};

export default memo(StarButton)