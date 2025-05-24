const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany({})

    const users = await Promise.all([
        prisma.user.create({
            data: {
                name: 'Adrien Quacchia',
                email: 'adrien.quacchia@gmail.com',
                password: 'adrien',
            },
        }),
    ])

    console.log('Seeded users:', users)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
