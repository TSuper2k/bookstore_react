import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import Data from './data';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { useState } from 'react';
import LoginForm from './components/Login';
function App() {
  const products = Data();
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <Header countCartItems={cartItems.length}></Header>
        <Routes>
          <Route path="/index" element={
            <div className="row">
              <Main products={products} onAdd={onAdd} />
              <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
            </div>
          } />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
