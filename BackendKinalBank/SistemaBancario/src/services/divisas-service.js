import axios from "axios";
import "dotenv/config";

export const convertirMoneda = async (from, to, amount) => {
    const response = await axios.get(
        `${process.env.DIVISAS_API_URL}/api/divisas/convertir`,
        { params: { from, to, amount } }
    );
    return response.data;
};