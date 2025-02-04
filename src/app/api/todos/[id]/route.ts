import { NextResponse, NextRequest } from 'next/server';
import * as yup from "yup";
import { Todo } from '@prisma/client';
import { prisma } from '@/lib/prisma';


interface Segments {
    params: {
        id: string;
    }
}

//?should use in the functions below
const getTodo = async (id: string): Promise<Todo | null> => {
    const todo = await prisma.todo.findFirst({ where: { id } });
    return todo;
}

export async function GET(request: NextRequest, segments: Segments) {

    const { id } = await segments.params;


    const todo = await prisma.todo.findFirst({
        where: { id },
    });

    if (!todo) {
        return NextResponse.json({ message: `todo with id '${id}' not found.` }, { status: 404 });
    }


    return NextResponse.json({
        todo
    });

}


const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),
});
export async function PUT(request: NextRequest, segments: Segments) {

    try {
        const { id } = await segments.params;

        const todo = await prisma.todo.findFirst({
            where: { id },
        });
        if (!todo) {
            return NextResponse.json({ message: `todo with id '${id}' not found.` }, { status: 404 });
        }

        const { complete, description } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description },
        });


        return NextResponse.json(updatedTodo);

    } catch (error) {
        if (error instanceof Error) {
            console.log("Error: ", error.stack);
            return NextResponse.json(error, { status: 500 });
        }

    }

}
