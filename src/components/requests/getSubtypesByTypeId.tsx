import axios from "axios"

const getSubtypesByTypeId = async (typeId: number) => {
    const data = {typeId : typeId}
    console.log(data)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/types/subTypes`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error desconocido al obtener subtipos de productos: ${error}`);
    }
}

export default getSubtypesByTypeId;