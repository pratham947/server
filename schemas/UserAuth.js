import {z} from "zod";

const Authenticate = z.object({
    firstName : z.string().min(2,{message:"firstname is not valid"}).max(20),
    lastName : z.string().min(2).max(20),
    email : z.string().email("this is not a valid email"),
    password : z.string().min(8)
})

export default Authenticate;

