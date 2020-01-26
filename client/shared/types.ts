export interface IUser {
  name: string;
  email: string;
  id: string;
  permissions: string[];
  cart: {
    id: string;
    quantity: number;
  };
}

export interface ICart {
  Cart: ICartItem[];
}

export interface ICartItem {
  id: string;
  quantity: number;
  item: IItem;
  user: IUser;
}

export interface IItem {
  id: string;
  title: string;
  description: string;
  image: string;
  largeImage: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
