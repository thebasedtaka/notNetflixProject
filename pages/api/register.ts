import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    //405 is a method not allowed error aka wrong http method
    res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }
    //use bcrypt to encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);
    //create the user
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    //send an ok
    res.status(200).json(user);
    return;
  } catch (error) {
    //bad request
    console.log(error);
    res.status(400).end();
    return;
  }
}
