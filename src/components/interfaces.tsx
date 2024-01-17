import { ReactNode } from "react";

export interface Users {
    id: number,
    name: string,
    email:string,
    password:string,
    street:string,
    zipCode:string,
    roleid:number,
    isActive: boolean
}

export type UserList = Users[];

export interface GoBackButtonProps {
    title: string,
}

export interface CartProps{  
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>  
    onClose: ()=> void   
}

export interface Errors {
    name?: string;
    email?: string;
    password?: string;
    street?: string;
    zipCode?: string;
}

export interface PrimaryButtonProps {
    title: string,
    onClickfunction: () => void;
}
export interface EditButtonProps {
    title: string,
    route: string,
}
export interface AlertButtonProps {
    title: string,
    onClickfunction: () => void;
}

export interface Review{
    content: string;
    rating: number;
    isActive:true,
    productId: number,
    userId:string
};

 export interface ProductReview {
    image: string;
  };

export interface ProductInterface{
    id: string,
    name: string,
    description: string,
    image: string
    price: number,
    discount: number,
    Reviews:Review[],
    stock: number,
}

export interface CreateProductInterface{
    name: string,
    description: string,
    image: string
    price: number,
    discount: number,
    isActive: boolean,
    TypeId: number,
    SubtypeId: number
    stock: number,
}

export interface ProductType{
    id: number;
    name: string;
    Subtypes?: Subtype[];
}

export interface Subtype{
    id: number;
    name: string;
    metric: string;
}



export interface FieldProps {
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
}

export interface PaginationProps {
    data: any[];
    recordsPerPage: number,
    currentPage: number,
    setCurrentPage: (pageNumber: number) => void;
}

export interface CredentialsLogin {
    email: string,
    password: string,
    googlePass: string,
}

export interface ValidationsInterface {
    name: string,
    username: string,
    dni: string,
    password: string
  }

  export interface ActiveBuyersProps {
    buyers: UserList;
    setBuyers: React.Dispatch<React.SetStateAction<UserList>>;
  }
  
export interface ActiveAdminsProps {
    admins: Users[];
    setAdmins: React.Dispatch<React.SetStateAction<Users[]>>;
  }

export interface UserPost {
    roleId: number | null,
    dni: string,
    username: string,
    password: string,
    name: string,
  }

export interface CartProviderProps {
    children: ReactNode;
  }

export interface CreateContextProps {
    contextProducts: CartInterface[];
    total: number,
    totalProducts: number,
<<<<<<< HEAD
    addProduct: (product: CartInterface) => void;
    deleteProduct: (productos: CartInterface[], id: string) => void;
    deleteAllProducts: (products: CartInterface[]) => void;
}

export interface CartInterface extends ProductInterface {
    quantity: number,
}

export interface PostCartInterface {
    title: string,
    quantity: number,
    currency_id: string,
    unit_price: number,
}
=======
    addProduct: (product: ProductInterface) => void;
    deleteProduct: (productos: ProductInterface[], id: string) => void;
    deleteAllProducts: (products: ProductInterface[]) => void;
}
>>>>>>> e39336501e6e3a30c4877992a1c7978c8a651982
