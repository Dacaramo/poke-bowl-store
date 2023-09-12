import { FC } from 'react';

interface Props {
  legend?: string;
  options: Array<string>;
  value: Array<string>;
  onChange: (value: string) => void;
}

const CheckboxGroup: FC<Props> = ({
  legend,
  options,
  value,
  onChange: handleChange,
}) => {
  return (
    <fieldset className='flex flex-col items-start gap-2'>
      {legend && (
        <legend className='ml-3 text-md font-nunito font-light'>
          {legend}
        </legend>
      )}
      <div className='flex flex-row flex-wrap gap-2'>
        {options.map((opc) => {
          return (
            <label
              key={opc}
              htmlFor={opc}
              className='text-md font-nunito font-light'
            >
              <input
                type='checkbox'
                className='mr-1'
                id={opc}
                checked={value.includes(opc)}
                onClick={() => handleChange(opc)}
              />
              {opc}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
