import axios from "axios"

const getSubtypesByTypeId = async (typeId: number) => {
    const data = {typeId: typeId}
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/types/subTypes`, data)
    } catch (error) {
        throw new Error(`Error desconocido al obtener subtipos de productos: ${error}`);
    }
}

export default getSubtypesByTypeId;