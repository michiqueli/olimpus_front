import axios from "axios";
import { CredentialsLogin } from "../../components/interfaces";

const userLogin = async (credentials: CredentialsLogin) => {
    const { email, password, googlePass } = credentials;
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        const errorMessage = (error instanceof Error && error.message) ? error.message : "Error desconocido";
        throw new Error(errorMessage);
    }
}

export default userLogin;