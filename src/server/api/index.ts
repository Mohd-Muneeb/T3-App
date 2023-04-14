/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addPost = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") {
    return res.status(405).json("Invalid Method");
  }

  const postData = JSON.parse(req.body);

  const savePost = await prisma.post.create({
    data: postData,
  });

  res.json(savePost);
};

export const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "GET") {
    return res.status(405).json("Invalid Method");
  }

  console.log("Hit api");
  const Posts = await prisma.post.findFirst();

  res.json(Posts);
};
