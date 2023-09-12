import { CSSProperties, FC, useState } from 'react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ZINC_950 } from '../../constants/colors';
import { ROUNDED_LG } from '../../constants/sizes';

interface Props {
  id: string;
  label: string;
  isLabelHidden: boolean;
  options: Array<string>;
  value: string;
  isNoneOptionAllowed?: boolean;
  onChange: (value: string) => void;
}

const Select: FC<Props> = ({
  id,
  label,
  isLabelHidden,
  options,
  value,
  isNoneOptionAllowed = true,
  onChange: handleClickOnListItem,
}) => {
  const [isButtonToggled, setIsButtonToggled] = useState<boolean>(false);

  const liClasses =
    'w-[100%] px-3 py-1 text-md bg-zinc-100 text-zinc-950 font-nunito font-light cursor-pointer hover:bg-zinc-300 hover:font-bold';

  const handleButtonClick = () => {
    setIsButtonToggled((prev) => !prev);
  };

  const getLiBorderRadius = (index: number): CSSProperties => {
    if (index === options.length - 1) {
      return {
        borderBottomLeftRadius: ROUNDED_LG,
        borderBottomRightRadius: ROUNDED_LG,
      };
    }

    return {};
  };

  return (
    <div className={'flex flex-col items-start gap-1'}>
      {!isLabelHidden && (
        <label
          htmlFor={id}
          className='ml-3 text-md font-nunito font-light text-zinc-950'
        >
          {label}
        </label>
      )}
      <button
        type='button'
        id={id}
        className='w-[200px] h-[30px] px-3 flex flex-row justify-between items-center bg-zinc-100 text-zinc-950 text-md rounded-lg font-nunito font-light'
        onClick={handleButtonClick}
      >
        {value}
        <FontAwesomeIcon
          icon={faCaretDown}
          size='sm'
          color={ZINC_950}
        />
      </button>
      {isButtonToggled && (
        <ul className='w-[150px] max-h-[160px] overflow-y-auto flex flex-col items-start '>
          {isNoneOptionAllowed && (
            <li
              className={`${liClasses} rounded-t-lg`}
              onClick={() => handleClickOnListItem('None')}
            >
              None
            </li>
          )}
          {options.map((opc, i) => {
            return (
              <li
                key={opc}
                className={liClasses}
                style={getLiBorderRadius(i)}
                onClick={() => handleClickOnListItem(opc)}
              >
                {opc}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
