import { prisma } from "../lib/prisma.js"


export async function SeedOneUser() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: 'Tim',
      email: 'tim.toth13@gmail.com',
      posts: {
        create: {
          make: 'BMW',
          model: 'i4',
          year: 2025,
        },
      },
    },
    include: {
      posts: true,
    },
  })
  console.log('Created user:', user)

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

// SeedOneUser()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })


