import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {

    try {

        await prisma.todo.deleteMany();

        const todos = await prisma.todo.createMany({
            data: [
                { description: "Piedra del alma", complete: true },
                { description: "Piedra del poder", },
                { description: "Piedra del tiempo", },
                { description: "Piedra del espacio", },
                { description: "Piedra del realidad", }
            ]
        });

        return NextResponse.json({ message: "Seed executed", todos });
    } catch (error) {
        return NextResponse.json({ error });
    }

}
