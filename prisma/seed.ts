import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@raymondgray.com';
    const adminPassword = 'secureAdminPassword123!'; // Change this in production!

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        const hashedPassword = await hash(adminPassword, 12);
        await prisma.user.create({
            data: {
                email: adminEmail,
                name: 'Admin User',
                password: hashedPassword,
                role: 'ADMIN',
                emailVerified: new Date(),
            },
        });
        console.log(`Creation successful. Admin user created with email: ${adminEmail}`);
    } else {
        console.log('Admin user already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
