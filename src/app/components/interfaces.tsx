export interface Users {
    name: string,
    surname: string,
    active: boolean,
    years: number,
}

export interface ButtonProps {
    title: string,
}

export interface FieldProps {
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string | number;
}