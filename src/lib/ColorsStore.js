import { getItems } from "@/assets/fetch";
const colors = await getItems(`${import.meta.env.VITE_SERVER_URI}/v2/colors`);
export default colors;
