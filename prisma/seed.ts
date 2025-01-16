import { PrismaClient } from "@prisma/client";
import UserSeed from "./seed/UserSeed";

const prisma = new PrismaClient;

const main = async () => {
    try{
        const User = new UserSeed(10);
        for(const user of User.data){
            await prisma.user.create({
                data: {
                    ...(user as any)
                }
            });
        }
        console.log(`Database has been seeded`);
    }catch(e){
        console.log(`Seed error`, e);
        throw e;
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