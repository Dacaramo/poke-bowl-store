import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { ZINC_300 } from '../../constants/colors';

interface Props {
  placeholder: string;
  size: 'sm' | 'md' | 'lg';
}

const TextInput: FC<Props> = ({ placeholder, size = 'md' }) => {
  const smSizeClasses = 'w-[75px] h-[30px] p-[7px] text-md';
  const mdSizeClasses =
    'w-[250px] h-[40px] pl-[10px] py-[10px] pr-[40px] text-lg';
  const lgSizeClasses =
    'w-[300px] h-[50px] pl-[15px] py-[15px] pr-[45px] text-xl';
  let sizeClasses = mdSizeClasses;
  if (size === 'sm') {
    sizeClasses = smSizeClasses;
  } else if (size === 'lg') {
    sizeClasses = lgSizeClasses;
  }

  const mdBottomDistanceClass = 'bottom-[5px]';
  const lgBottomDistanceClass = 'bottom-[10px]';
  const iconBottomDistanceClass =
    size === 'md' ? mdBottomDistanceClass : lgBottomDistanceClass;

  return (
    <div className='relative'>
      <input
        type='text'
        className={`${sizeClasses} font-nunito text-zinc-950 bg-zinc-100 placeholder-zinc-300 rounded-lg focus:outline-none`}
        placeholder={placeholder}
      />
      {(size === 'md' || size === 'lg') && (
        <div
          className={`absolute ${iconBottomDistanceClass} right-[5px] h-[30px] w-[30px] flex justify-center items-center`}
        >
          <FontAwesomeIcon
            icon={faSearch}
            size='lg'
            color={ZINC_300}
          />
        </div>
      )}
    </div>
  );
};

export default TextInput;
