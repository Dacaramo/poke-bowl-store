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
    <fieldset className='flex flex-row flex-wrap gap-2 items-center border-t border-zinc-100'>
      <legend className='font-lg font-nunito font-bold'>{legend}</legend>
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
    </fieldset>
  );
};

export default RangeInput;
