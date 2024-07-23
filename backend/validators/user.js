import zod from "zod";

export const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string(),
});

export const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});
