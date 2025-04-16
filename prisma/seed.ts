import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a new masterclass
  const masterclass = await prisma.masterclass.create({
    data: {
      title: "Visual Story-Telling",
      description: "Learn the art of filmmaking with hands-on modules.",
      price: 100000.99,
    },
  })

  // Create modules for the masterclass
  const modules = [
    {
      module: "Module 1",
      title: "Find Your Voice",
      intro: "Every great film begins with who you are.\n\n In this module, I’ll show you how to connect with your own story — what moves you, what shapes you, and what questions you need to ask to find your unique voice as a filmmaker.",
      videoSrc: "/videos/WHN.mp4",
      masterclassId: masterclass.id,
    },
    {
      module: "Module 2",
      title: "Build Your Theme",
      intro: "Stories only matter when they hold truth.\n\nI’ll teach you how to turn personal experiences into powerful themes that resonate with people — no matter where they are in the world.",
      videoSrc: "/videos/WHN.mp4",
      masterclassId: masterclass.id,
    },
    {
      module: "Module 3",
      title: "Create Your World",
      intro: "Use what you have. Build what you know.\n\nI’ll show you how to design the world of your story — choosing locations, spaces, and environments that feel real, accessible, and honest to the story you want to tell.",
      videoSrc: "/videos/WHN.mp4",
      masterclassId: masterclass.id,
    },
    {
      module: "Module 4",
      title: "Writing the Script",
      intro: "Strong stories come from simple, honest places.\n\nLearn how I build character, conflict, and structure — using real life, difficult questions, and emotional truth to create stories that stay with people long after the credits roll.",
      videoSrc: "/videos/WHN.mp4",
      masterclassId: masterclass.id,
    },
    {
      module: "Module 5",
      title: "Casting & Directing Performance",
      intro: "The right actors will change your story.\n\nI’ll show you how I cast for honesty, how I work with actors (both professionals and non-actors), and how I direct performances that feel raw, vulnerable, and unforgettable.",
      videoSrc: "/videos/WHN.mp4",
      masterclassId: masterclass.id,
    },
    {
      module: "Module 6",
      title: "Visual Storytelling & Production",
      intro: "Let your camera serve the story.\n\nLearn how I use cinematography, sound, light, and movement to build worlds that feel intimate, alive, and deeply human — even on a small budget.",
      videoSrc: "/videos/WHN.mp4",
      masterclassId: masterclass.id,
    },
    {
      module: "Bonus Module",
      title: "Monetizing & Distributing Your Film",
      intro: "Your film is your product. Own it.\n\nI’ll teach you how I build an audience for my films, how I think about distribution, and how to create a sustainable path as an independent filmmaker.",
      videoSrc: "/videos/WHN.mp4",
      masterclassId: masterclass.id,
    }
  ]

  // Add modules to the masterclass
  await prisma.module.createMany({
    data: modules,
  })

  // Example: Give a user access to the masterclass
  // Uncomment the following lines if you want to add user access
  // await prisma.masterclassAccess.create({
  //   data: {
  //     userId: "userId",  // Replace with an actual user ID
  //     masterclassId: masterclass.id,
  //   },
  // })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
