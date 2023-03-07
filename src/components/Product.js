import React from 'react';

export default function Product(props) {
    const { product, onAdd } = props;
    return (
        <div>
            <img className="small" src={'http://localhost:8081/' + product.image_path} alt={product.name} />
            <h3>{product.name}</h3>
            <div>{product.price.toLocaleString('vi-VN')} VNĐ</div>
            <div>
                <button onClick={() => onAdd(product)}>Add To Cart</button>
            </div>
        </div>
    );
}
