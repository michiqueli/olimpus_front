import axios from "axios"

const getMetrics = async (subType: string) => {
    const data = {subType : subType}
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/types/subTypes/metrics`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error desconocido al obtener subtipos de productos: ${error}`);
    }
}

export default getMetrics;