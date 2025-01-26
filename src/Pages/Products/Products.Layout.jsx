import React, { useEffect, useState } from "react";
import "./Products.Style.css";
import cartIcon from "../../Assets/Images/CartIcon.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import { getProductList } from "./Products.Service";
import { addProductToCart } from "../Cart/Cart.service";

const Product = () => {
  const [fetchProduct, setFetchProduct] = useState([]);
  const [button, setButton] = useState("Add to cart");
  const navigate = useNavigate();

  console.log("fetchproduct: ", fetchProduct);

  useEffect(() => {
    // Get all products
    (async () => {
      const results = await getProductList();
      setFetchProduct(results);
    })();
  }, []);

  // Add to cart
  const onHandleAddToCart = async (product) => {
    setButton(product.id);
    const results = await addProductToCart({
      productId: product.id,
      quantity: 1,
    });
    if (results) {
      toast.success(`${product.name} added to your cart`);
    } else {
      toast.error("Product is not added");
    }

    setTimeout(() => {
      setButton("Add to cart");
    }, 3000);
  };

  const onHandleNavigate = () => {
    navigate("/cart");
  };

  const onHandleLogout = () => {
    navigate("/signin");
    cookies.remove("authToken");
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <h1 className="headerTitle">Product List</h1>
          <img
            src={cartIcon}
            alt="Cart icon"
            className="cartIcon"
            style={{ cursor: "pointer" }}
            onClick={onHandleNavigate}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button onClick={onHandleLogout} className="btnClass">
            Logout
          </button>
        </div>
        <ul className="list">
          {fetchProduct.map((item) => (
            <li key={item.id} className="listItem">
              <strong>ID:</strong> {item.id} <br />
              <strong>Name:</strong> {item.name} <br />
              <strong>Price:</strong>{" "}
              <span className="price">${item.price}</span>
              <br />
              <button
                className="btnClass"
                onClick={() => onHandleAddToCart(item)}
              >
                {button === item.id ? "Added" : "Add to cart"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
