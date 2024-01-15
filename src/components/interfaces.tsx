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
  };

export interface ProductInterface{
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
    discount: number;
    isActive: boolean;
    TypeId: number;
    SubtypeId: number;
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