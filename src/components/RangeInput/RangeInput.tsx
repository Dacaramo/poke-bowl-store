import { ChangeEvent as ReactChangeEvent, FC } from 'react';

import TypeableInput from '../TypeableInput/TypeableInput';

interface Props {
  lowerLimitInput: {
    id: string;
    name: string;
    placeholder: string;
    label: string;
    value: string;
    onChange: (e: ReactChangeEvent<HTMLInputElement>) => void;
  };
  upperLimitInput: {
    id: string;
    name: string;
    placeholder: string;
    label: string;
    value: string;
    onChange: (e: ReactChangeEvent<HTMLInputElement>) => void;
  };
  legend: string;
  areIndividualLabelsHidden?: boolean;
}

const RangeInput: FC<Props> = ({
  lowerLimitInput,
  upperLimitInput,
  legend,
  areIndividualLabelsHidden = true,
}) => {
  return (
    <fieldset className='flex flex-col gap-2 items-start'>
      <legend className='ml-2 font-lg font-nunito font-light'>{legend}</legend>
      <div className='flex flex-row items-center gap-2'>
        <TypeableInput
          type='number'
          size='sm'
          isLabelHidden={areIndividualLabelsHidden}
          {...lowerLimitInput}
        />
        <TypeableInput
          type='number'
          size='sm'
          isLabelHidden={areIndividualLabelsHidden}
          {...upperLimitInput}
        />
      </div>
    </fieldset>
  );
};

export default RangeInput;
