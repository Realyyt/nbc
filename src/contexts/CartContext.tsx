import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course } from '../lib/supabase';

// Cart context type
interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  isInCart: (courseId: string) => boolean;
}

// Create cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('nbtaCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('nbtaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add course to cart
  const addToCart = (course: Course) => {
    // Check if course is already in cart
    if (!isInCart(course.id)) {
      setCartItems([...cartItems, course]);
    }
  };

  // Remove course from cart
  const removeFromCart = (courseId: string) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Check if course is in cart
  const isInCart = (courseId: string) => {
    return cartItems.some(item => item.id === courseId);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        getCartTotal, 
        isInCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};