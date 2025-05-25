/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_STRIPE_SECRET_KEY: string;
  readonly VITE_UDEMY_API_KEY: string;
  readonly VITE_UDEMY_CLIENT_ID: string;
  readonly VITE_COURSERA_API_KEY: string;
  readonly VITE_GOOGLE_API_KEY: string;
  readonly VITE_PAYSTACK_PUBLIC_KEY: string;
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
