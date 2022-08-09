import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/globalstate";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

export default function ProductItem({ product }) {
  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  function handleAddCart() {
    if (!product.inStock) return;

    const productItem = cart.find((item) => item._id === product._id);

    if (productItem) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: productItem._id,
        purchaseQuantity: parseInt(productItem.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        cart: { purchaseQuantity: 1, ...product },
      });
    }
  }

  return (
    <div className="flex-col justify-center items-center text-center h-fit">
      <Link to={`ProductDetails/${product._id}`}>
        <img
          className="cursor-pointer hover:scale-110"
          src={`images/${product.coverImage}`}
          alt="product cover"
        />
        <h4 className="cursor-pointer inline hover:underline">
          {product.name}
        </h4>
      </Link>
      <p>${product.price}</p>
      <p>
        {product.inStock ? (
          <span className="text-success">In stock</span>
        ) : (
          <span className="text-danger">Out of stock</span>
        )}
      </p>
      <button
        onClick={handleAddCart}
        className={`${
          product.inStock
            ? " bg-transparent hover:bg-main_teal text-main_teal font-semibold hover:text-main_white py-2 px-12 border border-main_teal hover:border-transparent duration-200 "
            : " py-2 px-12 border border-main_teal  bg-transparent text-main_teal font-semibold opacity-75 cursor-not-allowed line-through disabled"
        }  mt-2`}
      >
        Add to cart
      </button>
    </div>
  );
}
