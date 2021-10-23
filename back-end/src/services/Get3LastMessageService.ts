import prismaClient from "../prisma"

class Get3LastMessageService{
  async execute() {
    const message = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    })

    return message
  }
}

export { Get3LastMessageService }