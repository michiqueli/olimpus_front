import axios from "axios";
import { CredentialsLogin, CredentialsLoginResponse } from "../components/interfaces";

const userLogin = async (credentials: CredentialsLogin): Promise<CredentialsLoginResponse> => {
    const { email, password, googlePass } = credentials;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
            params: { email, password },
          });
        return response.data as CredentialsLoginResponse;
        console.log(response.data)
    } catch (error) {
        const errorMessage = (error instanceof Error && error.message) ? error.message : "Error desconocido";
        throw new Error(errorMessage);
    }
}

export default userLogin;