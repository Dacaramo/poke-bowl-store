import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ZINC_950 } from '../../constants/colors';
import { ROUNDED_LG } from '../../constants/sizes';
import { useDimensions } from '../../hooks/useDimensions';

interface Props {
  id: string;
  label: string;
  isLabelHidden: boolean;
  options: Array<string>;
  value: string;
  isNoneOptionAllowed?: boolean;
  onChange: (value: string) => void;
  width: 'sm' | 'lg';
}

const Select: FC<Props> = ({
  id,
  label,
  isLabelHidden,
  options,
  value,
  isNoneOptionAllowed = true,
  onChange: handleClickOnListItemCallback,
  width,
}) => {
  const [areOptionsVisible, setAreOptionsVisible] = useState<boolean>(false);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const ulDimensions = useDimensions(ulRef);

  const liClasses =
    'w-[100%] px-3 py-1 text-md bg-zinc-100 text-zinc-950 font-nunito font-light cursor-pointer hover:bg-zinc-300 hover:font-bold';
  const widthClasses = width === 'sm' ? 'w-[55px]' : 'w-[175px]';

  const handleButtonClick = () => {
    setAreOptionsVisible((prev) => !prev);
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

  const handleClickOnListItem = (opc: string) => {
    handleClickOnListItemCallback(opc);
    setAreOptionsVisible(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!buttonRef.current || !ulRef.current) {
        return;
      }

      if (
        areOptionsVisible &&
        !buttonRef.current.contains(e.target as Node) &&
        !ulRef.current.contains(e.target as Node)
      ) {
        setAreOptionsVisible(false);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [areOptionsVisible]);

  return (
    <div className={'relative flex flex-col items-start gap-1'}>
      {!isLabelHidden && (
        <label
          htmlFor={id}
          className='ml-3 text-md font-nunito font-light text-zinc-950'
        >
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type='button'
        id={id}
        className={`${widthClasses} h-[100%] min-h-[30px] px-3 flex flex-row justify-start items-center bg-zinc-100 text-zinc-950 text-md rounded-lg font-nunito font-light`}
        onClick={handleButtonClick}
      >
        {value}
        <FontAwesomeIcon
          className='ml-auto'
          icon={faCaretDown}
          size='sm'
          color={ZINC_950}
        />
      </button>
      <ul
        ref={ulRef}
        style={{
          bottom: -ulDimensions.height - 5,
          visibility: areOptionsVisible ? 'visible' : 'hidden',
        }}
        className='absolute z-[10] w-[150px] max-h-[160px] overflow-y-auto flex flex-col items-start drop-shadow shadow-md'
      >
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
    </div>
  );
};

export default Select;
