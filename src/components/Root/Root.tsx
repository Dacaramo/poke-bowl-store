import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ZINC_950 } from '../../constants/colors';
import { useStore } from '../../zustand/store';

interface Props {}

const Root: FC<Props> = () => {
  const navigate = useNavigate();
  const [cartProducts] = useStore((state) => {
    return [state.cartProducts];
  });

  return (
    <>
      <header className='py-2 px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-start'>
        <img
          className='cursor-pointer'
          src='/logo.png'
          alt='logo'
          onClick={() => navigate('/poke-bowl-store/')}
        />
        <button
          className='relative p-4 flex justify-center items-center bg-zinc-100 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 sm:ml-auto'
          onClick={() => navigate('/poke-bowl-store/cart')}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            size='xl'
            color={ZINC_950}
          />
          {cartProducts.length > -1 && (
            <div className='absolute -right-[12px] -bottom-[12px] min-w-[24px] h-[24px] flex justify-center items-center border-zinc-50 bg-orange-500 font-nunito font-bold text-sm rounded-full text-zinc-50'>
              {cartProducts.length}
            </div>
          )}
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
