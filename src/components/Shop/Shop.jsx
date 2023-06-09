import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    console.log(cart);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    useEffect(() => {

        const storedCart = getShoppingCart();
        // console.log(storedCart);

        const savedCart = [];

        // Step-1 : Get id of the the product
        for (const id in storedCart) {

            //step-2 : Get product from products state by using id
            const addedProduct = products.find(product => product.id === id);

            if (addedProduct) {

                // step-3 : add quantity 
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                // step-4 : add the added product to the saved cart
                savedCart.push(addedProduct);
            }
        }

        // step-5 : ste data
        setCart(savedCart);

    }, [products]);

    const handleAddToCart = (product) => {

        // ২য় পদ্ধতি
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {

            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];

        }

        // cart.push(product);
        // ১ম পদ্ধতি
        // const newCart = [...cart, product];

        setCart(newCart);
        addToDb(product.id);
    };

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                ></Cart>
            </div>
        </div>
    );
};

export default Shop;