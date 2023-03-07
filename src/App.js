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

  // Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setCartItems([]);
  }

  // Xử lý thêm sản phẩm vào giỏ
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

  // Xử lý xóa sản phẩm khỏi giỏ
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

  // Xử lý đặt hàng
  const onCheckout = () => {
    // Data truyền vào orders
    const products = cartItems.map((item) => ({ book_id: item.id, quantity: item.quantity }));
    const totalPrice = cartItems.reduce((total, item) => total + (item.qty * item.price), 0);
    const body = {
      products: products,
      totalPrice: totalPrice
    };

    // Gửi data lên sever
    axios
      .post("http://localhost:8081/api/orders", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        // Xóa giỏ hàng khi đặt hàng thành công
        setCartItems([]);
        alert("Checkout thành công!");
      })
      .catch((error) => {
        // Bắt lỗi nếu lỗi đặt hàng
        console.log(error);
        alert("Lỗi khi đặt hàng");
      });
  };

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
