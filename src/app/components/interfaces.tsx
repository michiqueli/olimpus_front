export interface Users {
    id: number,
    name: string,
    surname: string,
    active: boolean,
    years: number,
}

export interface ButtonProps {
    title: string,
}

export interface ProductInterface{
    id: string,
    name: string,
    description: string,
    image: string
}

export interface FieldProps {
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string | number;
}

export interface PaginationProps {
    data: any[];
    lastIndex?: number;
    firstIndex?: number;renderData: (data: any[]) => React.ReactNode; 
    recordsPerPage: number,
  }