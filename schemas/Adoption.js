
import {z} from "zod"

export const authenticate = z.object({
    name:z.string().min(2),
    age:z.number().min(1).max(18),
    fathername : z.string().min(2),
    mothername : z.string().min(2),
    education:z.string()
})