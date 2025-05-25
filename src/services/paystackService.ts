declare global {
  interface Window {
    PaystackPop: any;
  }
}

export const paystackService = {
  async initializePayment({
    email,
    amount,
    reference,
    onSuccess,
    onCancel,
  }: {
    email: string;
    amount: number;
    reference: string;
    onSuccess: (reference: string) => void;
    onCancel: () => void;
  }) {
    try {
      // Get Paystack public key from environment variable
      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
      
      if (!publicKey) {
        throw new Error('Paystack public key not found');
      }

      // Create payment handler
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email,
        amount: amount * 100, // Convert to kobo
        currency: 'NGN',
        ref: reference,
        callback: (response: any) => {
          // For now, we'll consider the payment successful if we get a response
          onSuccess(reference);
        },
        onClose: () => {
          onCancel();
        },
      });

      // Open Paystack payment modal
      handler.openIframe();
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  },

  generateReference() {
    return `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}; 