import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '../../assets/images/logo.png';
import { ZINC_950 } from '../../constants/colors';
import { useStore } from '../../zustand/store';

interface Props {}

const Root: FC<Props> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartProducts = useStore((state) => {
    return state.cartProducts;
  });

  return (
    <>
      <header className='h-[10vh] px-6 flex flex-row justify-between items-center gap-4'>
        <img
          className='w-[125px] sm:w-auto cursor-pointer'
          src={logo}
          alt='logo'
          onClick={() => navigate('/poke-bowl-store/')}
        />
        {pathname !== '/poke-bowl-store/cart' && (
          <button
            type='button'
            className='relative p-2 flex justify-center items-center bg-zinc-100 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500'
            onClick={() => navigate('/poke-bowl-store/cart')}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              size='xl'
              color={ZINC_950}
            />
            {cartProducts.length > -1 && (
              <div className='absolute -right-[10px] -bottom-[10px] min-w-[20px] h-[20px] flex justify-center items-center border-zinc-50 bg-orange-500 font-nunito font-bold text-sm rounded-full text-zinc-50'>
                {cartProducts.length}
              </div>
            )}
          </button>
        )}
      </header>
      <main className='min-h-[90vh] px-4 py-2'>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
