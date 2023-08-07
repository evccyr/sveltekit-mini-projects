import { PrismaClient, Prisma } from "@prisma/client";
import { v4 as uuid } from 'uuid';
import { log } from "console";

const prisma = new PrismaClient();

export async function load({ cookies }) {
  let userid = await cookies.get('userid');
  if (!userid) {
    cookies.set('userid', uuid(), { path: '/todo' });
    userid = await cookies.get('userid');
  }

  try {
    const user = await prisma.user.upsert({
      where: {
        userid,
      },
      update: {},
      create: {
        userid,
      },
    })
  } catch (err) {
    throw err;
  }

  try {
    const todoList = await prisma.todo.findMany({
      where: {
        userUserid: userid,
      },
      orderBy: {
        id: 'asc',
      },
    })
    log(todoList)
    return { list: todoList };
  } catch (err) {
    throw err;
  }

}

export const actions = {
  create: async ({ cookies, request }) => {
    const data = await request.formData();
    const task = data.get('task').trim();
    if (task === '') return { status: 204 }

    const userid = await cookies.get('userid');

    try {
      await prisma.todo.create({
        data: {
          task,
          done: false,
          user: {
            connect: {
              userid,
            },
          },
        },
      });
    } catch (err) {
      throw err;
    }

    return {
      status: 201
    }
  },

  update: async ({ cookies, request }) => {
    const data = await request.formData();
    const done = data.get('done') === 'true' ? false : true;
    const id = Number(data.get('id'));
    const userid = await cookies.get('userid');

    try {
      await prisma.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      })
    } catch (err) {
      throw err;
    }

    return {
      status: 201
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));

    try {
      await prisma.todo.delete({
        where: { id },
      })
    }
    catch (err) {
      log(err)
      return fail(500, { message: 'Cannot delete todo' })
    }
  }
}
