import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ShoppingIcon, ItenCount, CartIconContainer } from "./cart-icon.styles";

import React from "react";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItenCount>{cartCount}</ItenCount>
    </CartIconContainer>
  );
};

export default CartIcon;
