import { FC, memo } from 'react';

interface Props {}

const ListItem: FC<Props> = () => {
  return <div>ListItem</div>;
};

const Memo = memo(ListItem);

export default Memo;
