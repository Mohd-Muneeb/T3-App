/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Post, type Users } from "@prisma/client";
import { prisma } from "~/server/db";

function Page({ res }: any) {
  // Render data...
  // console.log(res);

  return (
    <div>
      <h1>
        {res.map((post: any) => {
          return (
            <div key={post.title}>
              <h1>{post.name}</h1>
              <img className="max-h-[10vh] w-[10vh] object-cover rounded-full" src={post.profile}></img>
              <h1>{post.authorId}</h1>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <img src={post.url} className="h-[40vh]"></img>
            </div>
          );
        })}
      </h1>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  const post: Post[] = await prisma.post.findMany();

  const res: any[] = [];

  for (let i = 0; i < post.length; i++) {
    const user: Users = await prisma.users.findUniqueOrThrow({
      where: { id: post[0]?.authorId },
    });
    res.push({ ...post[i], ...user });
  }
  console.log(res);
  return {
    props: {
      res: res,
    },
  };
}

export default Page;
