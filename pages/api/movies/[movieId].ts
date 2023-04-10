import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method != "GET") return res.status(405).end();

    const { movieId } = req.query;

    if (typeof movieId != "string") throw new Error("Invalid ID");
    if (!movieId) throw new Error("Invalid ID");

    await serverAuth(req, res);

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieId) throw new Error("Invalid ID");

    res.status(200).json(movie);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).end;
    return;
  }
}
