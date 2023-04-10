import { PrismaClient } from "@prisma/client";

// save prismaclient in a global file so there is no hot reload
// will create excess prisma files otherwise

const client = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV == "production") global.prismadb = client;

export default client;
