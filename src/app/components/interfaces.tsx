export interface Users {
    id: number,
    name: string,
    street: string,
    isActive: boolean,
    roleId: number,
}

export type UserList = Users[];

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

export interface ProductInterface{
    id: string,
    name: string,
    description: string,
    image: string
    price: number,
    discount: number
}

export interface FieldProps {
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
