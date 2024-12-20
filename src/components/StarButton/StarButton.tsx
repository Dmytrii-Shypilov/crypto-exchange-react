import s from './star.module.scss'

import { Icons } from "../SVGIcons/icons";
import { useSelector, useDispatch } from "react-redux";
import { getFavCoins } from "../../redux/coins/coins-selector";
import { addToFavorite } from '../../redux/coins/coins-slice';
import { memo } from 'react';

const StarButton: React.FC<{pair: string, size: string}> = ({pair, size}) => {
    const dispatch = useDispatch()
    const favCoins = useSelector(getFavCoins)
    const isFavorite = favCoins.includes(pair)

    const onPairSelect = () => {
        dispatch(addToFavorite(pair))
        // post request
    }

  return (
    <span onClick={onPairSelect} className={isFavorite? s.icon_fav : s.icon}>
      <Icons.StarIcon width={size} height={size}/>
    </span>
  );
};

export default memo(StarButton)