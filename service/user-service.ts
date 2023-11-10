import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};

export const testing = async()=>{
    return "Hi";
}
