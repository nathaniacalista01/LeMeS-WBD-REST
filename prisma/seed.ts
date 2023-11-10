import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < 30; i++) {
    await prisma.user.create({
      data: {
        username: "username" + i,
        fullname: "username" + i,
        password: await bcrypt.hash("password", 10),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
