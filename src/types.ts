export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription?: string;
  price: number;
  unit: string;
  category: 'torte' | 'mignon' | 'lievitati' | 'cioccolateria' | 'stagionali' | 'regali';
  allergens: string[];
  isSignature?: boolean;
  image?: string;
  badge?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  tag?: string;
  isLocalGuide?: boolean;
  replied?: boolean;
  replyText?: string;
}

export interface CustomCakeConfig {
  occasion: string;
  servings: number;
  baseFlavor: string;
  filling: string;
  decorations: string[];
  deliveryDate: string;
  deliveryTime: string;
  specialNotes: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
