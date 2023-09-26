import { FC, MouseEvent as ReactMouseEvent, useState } from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ZINC_100, ZINC_300 } from '../../constants/colors';
import { ProductType } from '../../model/Product';

interface Props {
  size: 'sm' | 'lg';
  imageUrls: Array<string>;
  productType: ProductType;
}

const ImageCarrousel: FC<Props> = ({ size, imageUrls, productType }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const iconSize = size === 'sm' ? 'xl' : '2xl';
  const iconColor = ZINC_300;
  const imageClasses =
    size === 'sm'
      ? 'w-[175px] h-[175px] object-contain'
      : 'w-[175px] h-[175px] sm:w-[500px] sm:h-auto object-contain';

  const handleClickOnLeft = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const handleClickOnRight = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (currentIndex === imageUrls.length - 1) {
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleClickOnSpecificItem = (e: ReactMouseEvent, itemIndex: number) => {
    e.stopPropagation();
    setCurrentIndex(itemIndex);
  };

  return (
    <div className='w-[100%] flex flex-col gap-5 items-center rounded-lg'>
      <div className='w-[100%] flex flex-row justify-around items-center gap-5'>
        <button
          type='button'
          style={{ opacity: currentIndex - 1 >= 0 ? 1 : 0 }}
          onClick={handleClickOnLeft}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            size={iconSize}
            color={iconColor}
          />
        </button>
        <img
          className={imageClasses}
          src={imageUrls[currentIndex]}
          alt=''
        />
        <button
          type='button'
          style={{ opacity: currentIndex + 1 <= imageUrls.length - 1 ? 1 : 0 }}
          onClick={handleClickOnRight}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            size={iconSize}
            color={iconColor}
          />
        </button>
      </div>
      {imageUrls.length > 1 && (
        <ul className='flex flex-row gap-3'>
          {imageUrls.map((url, i) => {
            return (
              <button
                key={url}
                type='button'
                className='w-[10px] h-[10px] rounded-full'
                style={{
                  backgroundColor: i === currentIndex ? ZINC_300 : ZINC_100,
                }}
                onClick={(e) => handleClickOnSpecificItem(e, i)}
              ></button>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ImageCarrousel;
