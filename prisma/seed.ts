import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const min = 1;
const max = 29;
async function main() {
  try {
    // Menjalankan seeding satu per satu
    await seedUser();
    await seedCourse();
    await seedModule();
    await seedMaterial();
  } catch (error) {
    console.error(error);
  } finally {
    // Disconnect dari Prisma setelah selesai
    await prisma.$disconnect();
  }
}

const seedUser = async () => {
  for (let i = 0; i < 30; i++) {
    await prisma.user.create({
      data: {
        username: "username " + i,
        fullname: "fullname " + i,
        password: await bcrypt.hash("password", 10),
      },
    });
  }
};

const seedCourse = async () => {
  for (let i = 0; i < 30; i++) {
    const randomTeacherId = Math.floor(Math.random() * (max - min + 1) + min);
    try {
      await prisma.coursePremium.create({
        data: {
          title: "title " + i,
          description: "description " + i,
          teacher_id: randomTeacherId,
        },
      });
    } catch (error: any) {
      console.log(randomTeacherId);
      console.log(error.message);
    }
  }
};
const seedModule = async () => {
  for (let i = 0; i < 30; i++) {
    const randomCourseId = Math.floor(Math.random() * (max - min + 1) + min);
    try {
      await prisma.modulPremium.create({
        data: {
          title: "title " + i,
          description: "description " + i,
          course_id: randomCourseId,
        },
      });
    } catch (error) {
      console.log(randomCourseId);
      console.log(error);
    }
  }
};

const seedMaterial = async () => {
  for (let i = 0; i < 30; i++) {
    const randomModuleId = Math.floor(Math.random() * (max - min + 1) + min);
    try {
      await prisma.materialPremium.create({
        data: {
          title: "title " + i,
          description: "description " + i,
          source_type: "PDF",
          material_path: "/",
          modul_id: randomModuleId,
        },
      });
    } catch (error: any) {
      console.log(randomModuleId);
      console.log(error);
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
