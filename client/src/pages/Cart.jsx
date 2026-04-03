import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Header from "../components/layout/Header";

import CartItem from "../components/cart/CartItem";
import CartCouponCard from "../components/cart/CartCouponCard";
import CartSummaryCard from "../components/cart/CartSummaryCard";
import CartBenefitsRow from "../components/cart/CartBenefitsRow";
import SavedForLaterSection from "../components/cart/SavedForLaterSection";
import ProductDiscountBanner from "../components/common/ProductDiscountBanner";
import FooterSection from "../components/common/FooterSection";

import {
  getCartItems,
  updateCartItemQty as updateGuestCartItemQty,
  removeCartItem as removeGuestCartItem,
  clearCart as clearGuestCart,
} from "../utils/cartHelpers";

import {
  getMyCart,
  updateCartItemQty,
  removeCartItem,
  clearCart,
} from "../services/cartService";

import "../styles/cart.css";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const normalizeCartItems = (items = []) => {
    return items.map((item) => {
      const productId =
        typeof item.product === "object" && item.product !== null
          ? item.product._id || item.product.id
          : item.product || item.id;

      const stockValue =
        typeof item.product === "object" && item.product !== null
          ? Number(item.product.stock ?? 0)
          : item.stock ?? item.productStock ?? null;

      const quantity = Number(item.quantity || 0);
      const hasKnownStock = stockValue !== null && !Number.isNaN(Number(stockValue));
      const stock = hasKnownStock ? Number(stockValue) : null;

      return {
        ...item,
        id: item.id || productId,
        product: productId,
        name: item.name || item.title || "",
        title: item.title || item.name || "",
        price: Number(item.price || 0),
        quantity,
        stock,
        hasKnownStock,
        isOutOfStock: hasKnownStock ? stock === 0 : false,
        insufficientStock: hasKnownStock ? quantity > stock && stock > 0 : false,
      };
    });
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);

        if (isAuthenticated) {
          const data = await getMyCart();
          const items = data?.cart?.items || [];
          setCartItems(normalizeCartItems(items));
        } else {
          const items = getCartItems();
          setCartItems(normalizeCartItems(items));
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleQuantityChange = async (id, value) => {
    try {
      if (isAuthenticated) {
        const data = await updateCartItemQty(id, Number(value));
        const items = data?.cart?.items || data?.items || [];
        setCartItems(normalizeCartItems(items));
      } else {
        const updated = updateGuestCartItemQty(id, Number(value));
        setCartItems(normalizeCartItems(updated));
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert(error?.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      if (isAuthenticated) {
        const data = await removeCartItem(id);
        const items = data?.cart?.items || data?.items || [];
        setCartItems(normalizeCartItems(items));
      } else {
        const updated = removeGuestCartItem(id);
        setCartItems(normalizeCartItems(updated));
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert(error?.response?.data?.message || "Failed to remove item");
    }
  };

  const handleRemoveAll = async () => {
    try {
      if (isAuthenticated) {
        const data = await clearCart();
        const items = data?.cart?.items || data?.items || [];
        setCartItems(normalizeCartItems(items));
      } else {
        const updated = clearGuestCart();
        setCartItems(normalizeCartItems(updated));
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert(error?.response?.data?.message || "Failed to clear cart");
    }
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "save10") {
      setDiscountValue(10);
      alert("Coupon applied: $10 OFF");
    } else {
      setDiscountValue(0);
      alert("Invalid coupon");
    }
  };

  const handleCheckout = async () => {
    try {
      if (!isAuthenticated) {
        alert("Please login first to continue.");
        navigate("/login", {
          state: {
            from: "/cart",
            checkoutIntent: true,
          },
        });
        return;
      }

      if (!cartItems.length) {
        alert("Your cart is empty.");
        return;
      }

      const hasOutOfStockItem = cartItems.some((item) => item.isOutOfStock);
      const hasInsufficientStockItem = cartItems.some((item) => item.insufficientStock);

      if (hasOutOfStockItem) {
        alert("Some items in your cart are out of stock. Please remove them first.");
        return;
      }

      if (hasInsufficientStockItem) {
        alert("Some items in your cart exceed available stock. Please update quantities.");
        return;
      }

      navigate("/checkout", {
        state: {
          cartItems,
          pricing,
          discountValue,
          coupon,
        },
      });
    } catch (error) {
      console.error("Failed to continue checkout:", error);
      alert("Unable to continue checkout");
    }
  };

  const pricing = useMemo(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    const discount = discountValue;
    const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal - discount + tax;

    return { subtotal, discount, tax, total };
  }, [cartItems, discountValue]);

  return (
    <div className="cart-page">
      <Header />

      <main className="cart-main">
        <div className="container">
          <h1 className="cart-page-title">My cart ({cartItems.length})</h1>

          <div className="cart-layout">
            <section className="cart-items-card">
              {loading ? (
                <div className="cart-empty-state">
                  <h2>Loading cart...</h2>
                </div>
              ) : cartItems.length > 0 ? (
                <>
                  <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={item.product || item.id}
                        item={item}
                        isLast={index === cartItems.length - 1}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>

                  <div className="cart-actions-row">
                    <Link to="/products" className="cart-back-btn">
                      <FiArrowLeft />
                      <span>Back to shop</span>
                    </Link>

                    <button
                      type="button"
                      className="cart-remove-all-btn"
                      onClick={handleRemoveAll}
                    >
                      Remove all
                    </button>
                  </div>
                </>
              ) : (
                <div className="cart-empty-state">
                  <h2>Your cart is empty</h2>
                  <p>Add products to continue shopping.</p>

                  <Link to="/products" className="cart-back-btn">
                    <FiArrowLeft />
                    <span>Back to shop</span>
                  </Link>
                </div>
              )}
            </section>

            <aside className="cart-sidebar">
              <CartCouponCard
                coupon={coupon}
                setCoupon={setCoupon}
                onApply={handleApplyCoupon}
              />

              <CartSummaryCard
                pricing={pricing}
                onCheckout={handleCheckout}
                checkingOut={false}
              />
            </aside>
          </div>

          <CartBenefitsRow />
          <SavedForLaterSection />
          <ProductDiscountBanner />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default Cart;
