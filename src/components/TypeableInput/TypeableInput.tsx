import {
  ChangeEvent as ReactChangeEvent,
  FC,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ZINC_300 } from '../../constants/colors';

interface Props {
  type: 'text' | 'number';
  id: string;
  name: string;
  placeholder: string;
  label: string;
  value: string;
  size: 'sm' | 'md' | 'lg';
  isLabelHidden: boolean;
  onChange: (e: ReactChangeEvent<HTMLInputElement>) => void;
}

const TypeableInput: FC<Props> = ({
  type,
  id,
  name,
  placeholder,
  label,
  value,
  size,
  isLabelHidden,
  onChange: handleChange,
}) => {
  const numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const actionKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
  let inputClasses =
    'rounded-lg font-nunito font-light text-zinc-950 placeholder-zinc-300 bg-zinc-100 focus:outline-none ';
  if (size === 'sm') {
    inputClasses += 'w-[75px] h-[25px] px-2 text-sm';
  } else if (size === 'md') {
    inputClasses += 'w-[200px] h-[30px] px-3 text-md';
  } else if (size === 'lg') {
    inputClasses += 'w-[325px] h-[40px] pl-[12.5px] pr-[41.5px] text-xl';
  }
  let labelClasses = 'mb-1 font-nunito font-light text-zinc-950 ';
  if (size === 'sm') {
    labelClasses += 'ml-2 text-sm ';
  } else if (size === 'md') {
    labelClasses += 'ml-3 text-md ';
  } else if (size === 'lg') {
    labelClasses += 'ml-[15px] text-xl';
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (type === 'number') {
      if (!numericKeys.includes(e.key) && !actionKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className='relative flex flex-col items-start'>
      <label
        hidden={isLabelHidden}
        htmlFor={id}
        className={labelClasses}
      >
        {label}
      </label>
      <input
        type={'text'}
        className={inputClasses}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {size === 'lg' && (
        <FontAwesomeIcon
          className='absolute right-[12.5px] bottom-[7px]'
          icon={faSearch}
          size='xl'
          color={ZINC_300}
        />
      )}
    </div>
  );
};

export default TypeableInput;
