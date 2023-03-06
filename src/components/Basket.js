import React from 'react';

export default function Basket(props) {
    const { cartItems, onAdd, onRemove } = props;
    const totalPrice = cartItems.reduce((total, item) => total + (item.qty * item.price), 0);

    return (
        <aside className="block col-1">
            <h2>Cart Items</h2>
            {cartItems.length === 0 ? (
                <div>Cart is empty</div>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div key={item.id} className="row">
                            <div className="col-2">{item.name}</div>
                            <div className="col-2">
                                <button onClick={() => onRemove(item)} className="remove">
                                    -
                                </button>{' '}
                                <button onClick={() => onAdd(item)} className="add">
                                    +
                                </button>
                            </div>
                            <div className="col-2 text-right">
                                {item.qty} x ${item.price}
                            </div>
                        </div>
                    ))}
                    <hr />
                    <div className="row">
                        <div className="col-2">
                            <strong>Total Price</strong>
                        </div>
                        <div className="col-1 text-right">
                            <strong>${totalPrice}</strong>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <button onClick={() => alert('Implement Checkout!')}>
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </aside>
    );
}
