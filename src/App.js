import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import Data from './data';
import LoginForm from './components/Login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { useState } from 'react';

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

  const onCheckout = () => {
    // Prepare the data for the order
    const products = cartItems.map((item) => ({ book_id: item.id, quantity: item.quantity }));
    const totalPrice = cartItems.reduce((total, item) => total + (item.qty * item.price), 0);
    const body = {
      products: products,
      totalPrice: totalPrice
    };

    // Send the order data to the server
    axios
      .post("http://localhost:8081/api/orders", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        // Empty the cart and display a success message
        setCartItems([]);
        alert("Checkout thành công!");
      })
      .catch((error) => {
        // Display an error message if the server request fails
        console.log(error);
        alert("Lỗi khi đặt hàng");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setCartItems([]);
  }

  return (
    <Router>
      <div className="App">
        <Header countCartItems={cartItems.length} handleLogout={handleLogout}></Header>
        <Routes>
          <Route path="/index" element={
            <div className="row">
              <Main products={products} onAdd={onAdd} />
              <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} onCheckout={onCheckout}/>
            </div>
          } />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
