import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../redux/store/cart/cart.selector";
import { setIsCartOpen } from "../../redux/store/cart/cart.action";
import { ShoppingIcon, ItenCount, CartIconContainer } from "./cart-icon.styles";

import React from "react";

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItenCount>{cartCount}</ItenCount>
    </CartIconContainer>
  );
};

export default CartIcon;
