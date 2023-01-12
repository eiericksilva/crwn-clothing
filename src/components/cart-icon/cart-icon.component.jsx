import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ShoppingIcon, ItenCount, CartIconContainer } from "./cart-icon.styles";

import React from "react";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItenCount>{cartItemCount}</ItenCount>
    </CartIconContainer>
  );
};

export default CartIcon;
