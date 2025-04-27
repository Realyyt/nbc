import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, AlertCircle, Check, User, Phone, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'Lagos',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [session, setSession] = useState<any>(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login?redirect=checkout');
        return;
      }
      setSession(session);
    };
    checkSession();
  }, [navigate]);

  // Update form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    
    try {
      if (formData.paymentMethod === 'card') {
        // Process card payment
        const cartItemIds = cartItems.map(item => item.id);
        await handlePayment(cartItemIds[0]); // For now, just handle first item
      }
      
      setSuccess(true);
      clearCart();
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        navigate('/dashboard/courses');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handlePayment = async (courseId: string) => {
    if (!session || !stripe || !elements) return;

    try {
      const { data: { clientSecret }, error: intentError } = await supabase.functions.invoke('create-payment-intent', {
        body: { courseId }
      });

      if (intentError) throw new Error(intentError.message);

      const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: formData.cardName,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              country: 'NG',
            }
          }
        }
      });

      if (paymentError) throw new Error(paymentError.message);
      if (!paymentIntent) throw new Error('Payment failed');

      if (paymentIntent.status === 'succeeded') {
        // Record purchase in database
        const { error: purchaseError } = await supabase.from('purchases').insert({
          user_id: session.user.id,
          course_id: courseId,
          amount: paymentIntent.amount,
          status: 'completed',
          payment_intent_id: paymentIntent.id
        });

        if (purchaseError) throw new Error(purchaseError.message);
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      throw error;
    }
  };
  
  // Calculate total
  const subtotal = getCartTotal();
  const tax = subtotal * 0.075; // 7.5% VAT in Nigeria
  const total = subtotal + tax;
  
  // If cart is empty, redirect to courses
  if (cartItems.length === 0 && !success) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some courses to your cart before proceeding to checkout.</p>
            <button
              onClick={() => navigate('/courses')}
              className="btn-primary"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // If payment is successful, show success message
  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <div className="h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your enrollment has been confirmed for the selected course(s).
              You will receive a confirmation email shortly with all the details.
            </p>
            <button
              onClick={() => navigate('/dashboard/courses')}
              className="btn-primary"
            >
              Go to My Courses
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
          Checkout
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main checkout form */}
          <div className="flex-grow">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {/* Checkout steps */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-4 text-center font-medium ${
                    step === 1 ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                  onClick={() => setStep(1)}
                >
                  1. Personal Information
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium ${
                    step === 2 ? 'text-primary border-b-2 border-primary' : 'text-gray-500'
                  }`}
                  onClick={() => step === 2 && setStep(2)}
                  disabled={step < 2}
                >
                  2. Payment Details
                </button>
              </div>
              
              {/* Form content */}
              <form onSubmit={handleSubmit} className="p-6">
                {error && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-600">
                    <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                
                {/* Step 1: Personal information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="input pl-10 w-full"
                          />
                          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input pl-10 w-full"
                          />
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+234"
                          className="input pl-10 w-full"
                        />
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <input
                          id="address"
                          name="address"
                          type="text"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="input pl-10 w-full"
                        />
                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <select
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="input w-full"
                        >
                          <option value="Lagos">Lagos</option>
                          <option value="Abuja">Abuja</option>
                          <option value="Rivers">Rivers</option>
                          <option value="Kano">Kano</option>
                          <option value="Oyo">Oyo</option>
                          <option value="Enugu">Enugu</option>
                          <option value="Delta">Delta</option>
                          <option value="Kaduna">Kaduna</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-primary w-full"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Payment details */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h2>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="card-payment"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary"
                        />
                        <label htmlFor="card-payment" className="flex items-center">
                          <CreditCard size={20} className="mr-2 text-gray-600" />
                          <span>Credit/Debit Card</span>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="bank-transfer"
                          name="paymentMethod"
                          value="transfer"
                          checked={formData.paymentMethod === 'transfer'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary"
                        />
                        <label htmlFor="bank-transfer">Bank Transfer</label>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 border border-gray-200 rounded-md">
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            id="cardName"
                            name="cardName"
                            type="text"
                            required
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className="input w-full"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            id="cardNumber"
                            name="cardNumber"
                            type="text"
                            required
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="input w-full"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              id="cardExpiry"
                              name="cardExpiry"
                              type="text"
                              required
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="input w-full"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              id="cardCvv"
                              name="cardCvv"
                              type="text"
                              required
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              placeholder="XXX"
                              className="input w-full"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formData.paymentMethod === 'transfer' && (
                      <div className="p-4 border border-gray-200 rounded-md">
                        <p className="text-sm text-gray-600 mb-2">Please use the following bank details for your transfer:</p>
                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Bank Name:</span> First Bank Nigeria
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Account Name:</span> NBTA Learning Ltd
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Account Number:</span> 1234567890
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Reference:</span> {user?.name?.split(' ')[0]}-{new Date().getTime().toString().slice(-6)}
                          </p>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          After making the transfer, please click the "Complete Order" button below. We will verify your payment and confirm your enrollment.
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-4 flex flex-col sm:flex-row sm:justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn-outline sm:w-auto"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="btn-primary sm:w-auto flex items-center justify-center"
                      >
                        {isProcessing ? (
                          <>
                            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            Processing...
                          </>
                        ) : (
                          'Complete Order'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-80">
            <div className="bg-white shadow-md rounded-lg overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.instructor}</p>
                        <p className="text-sm font-semibold">₦{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between py-1">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-sm text-gray-600">VAT (7.5%)</span>
                    <span className="text-sm font-medium">₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-t mt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-lg">₦{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  By completing your purchase, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;