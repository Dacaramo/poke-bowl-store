import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import CartPage from './components/pages/CartPage/CartPage';
import ProductPage from './components/pages/ProductPage/ProductPage';
import ProductsPage from './components/pages/ProductsPage/ProductsPage';
import Root from './components/Root/Root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/poke-bowl-store'
      element={<Root />}
    >
      <Route
        index
        element={<ProductsPage />}
      />
      <Route
        path='/poke-bowl-store/cart'
        element={<CartPage />}
      />
      <Route
        path='/poke-bowl-store/product/:productName'
        element={<ProductPage />}
      />
      <Route path='/poke-bowl-store/*' />
    </Route>
  )
);

interface Props {}

const App: FC<Props> = () => {
  return <RouterProvider router={router} />;
};

export default App;
