import {z} from "zod";

const Authenicate = z.object({
    password:z.string().min(8)
})

export default Authenicate; 