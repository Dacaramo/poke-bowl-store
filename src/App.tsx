import { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Root from './components/Root/Root';
import ProductsPage from './components/ProductsPage/ProductsPage';

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
      <Route path='/poke-bowl-store/product/:productName' />
      <Route path='poke-bowl-store/cart' />
      <Route path='/poke-bowl-store/*' />
    </Route>
  )
);

interface Props {}

const App: FC<Props> = () => {
  return <RouterProvider router={router} />;
};

export default App;
