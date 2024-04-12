interface IBanner {
  id: number;
  title: string;
  image: string;
  status: number;
  created_at: string;
  updated_at: string;
  image_url: string;
}

interface ICategory {
  id: number;
  name: string;
  description: null;
  image: null;
  status: number;
  created_at: null;
  updated_at: null;
  deleted_at: null;
}

interface IProduct {
  id: number;
  name: string;
  category_id: number;
  description: null;
  price: string;
  is_active: number;
  image: null;
  created_at: null;
  updated_at: null;
  deleted_at: null;
  image_url: string;
}

interface IDeliveryResponse {
  status: string;
  data: {
    delivery_amount: string;
  };
}

interface CartProduct {
  id: number;
  quantity: number;
}

interface OrderDataObj {
  chat_id: string | number;
  address: string;
  comment: string;
  products: CartProduct[];
}
