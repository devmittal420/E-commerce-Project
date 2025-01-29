import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../Assets/Images/CartIcon.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  clearCartProduct,
  deleteCartProduct,
  getCartList,
  updateProductInCart,
} from "./Cart.Service";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [removeCartDialog, setRemoveCartDialog] = useState(false);
  const [clearCartDialog, setClearCartDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const results = await getCartList();
      setCart(Object.values(results));
    })();
  }, []);

  // Update in cart
  const onHandleUpdateCart = async (productId, increase) => {
    const getCartDetails = [...cart];
    const updateQuantity = getCartDetails.find((prev) => prev.id === productId);

    if (increase) {
      updateQuantity.quantity += 1;
    } else {
      updateQuantity.quantity -= 1;
    }

    // if (updateQuantity.quantity < 1) {
    //   onClickRemoveProductOpen(productId);
    // } else {
    const results = await updateProductInCart(productId, updateQuantity);
    setCart(Object.values(results.cart));
    // }
  };

  const onClickRemoveProductOpen = (productId) => {
    setRemoveCartDialog(productId);
  };
  const onClickRemoveProductClose = () => {
    setRemoveCartDialog(false);
  };

  // Remove from cart
  const onHandleRemoveFromCart = async () => {
    const results = await deleteCartProduct(removeCartDialog);
    setCart(Object.values(results.cart));
    toast.success("product removed successfully");
    setRemoveCartDialog(false);
  };

  const onClickClearProductOpen = () => {
    setClearCartDialog(true);
  };
  const onClickClearProductClose = () => {
    setClearCartDialog(false);
  };

  // Clear from cart
  const onHandleClearCart = async () => {
    const results = await clearCartProduct();
    setCart(Object.values(results.cart));
    toast.success("Cart cleared successfully.");
    setClearCartDialog(false);
  };

  const onHandleNavigate = () => {
    navigate("/product");
  };

  return (
    <div>
      <div className="header">
        <button onClick={onHandleNavigate} className="backBtn">
          Back
        </button>
        <img src={cartIcon} alt="Cart icon" className="headerTitle" />
      </div>
      {!cart ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="list">
          {!cart ? (
            <p>No products in cart</p>
          ) : (
            cart.map((item) => (
              <ul key={item.id} className="listItem">
                <strong className="idClass">ID:</strong> {item.id} <br />
                <strong className="">Name:</strong> {item.name} <br />
                <strong className="">Price:</strong>{" "}
                <span className="price"> ${item.price * item.quantity} </span>{" "}
                <br />
                <strong>Quantity:</strong> {item.quantity} <br />
                <button
                  className="btnClass decreaseBtn"
                  onClick={() => onHandleUpdateCart(item.id, false)}
                >
                  -
                </button>
                <button
                  className="btnClass increaseBtn"
                  onClick={() => onHandleUpdateCart(item.id, true)}
                >
                  +
                </button>
                <br />
                <button
                  className="btnClass removeBtn"
                  onClick={() => onClickRemoveProductOpen(item.id)}
                >
                  Remove
                </button>
              </ul>
            ))
          )}
        </div>
      )}
      <button className="btnClass" onClick={onClickClearProductOpen}>
        Clear Cart
      </button>

      {/* Logic for Remove cart */}
      <Dialog
        open={!!removeCartDialog}
        onClose={onClickRemoveProductClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontWeight: "600" }}
          >
            Do you want to remove this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClickRemoveProductClose}
            style={{ fontSize: "0.8rem", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onHandleRemoveFromCart}
            autoFocus
            style={{ fontSize: "0.8rem", fontWeight: "bold" }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Logic for Clear cart */}
      <Dialog
        open={!!clearCartDialog}
        onClose={onClickClearProductClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Clear this Cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClearProductClose}>Cancel</Button>
          <Button onClick={onHandleClearCart}>Clear</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
