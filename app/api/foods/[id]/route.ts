import {foods} from "@/app/data";
import {IFood} from "@/app/types";
import {NextResponse} from "next/server";


export async function GET(request: Request, {params} :{params : Promise<{id : string}>} ){
    const { id } = await params
    const data : IFood | undefined= foods.find((f : IFood) => f.id === Number(id))
    
    if (data)
        return NextResponse.json(data)
    else
        return NextResponse.json({message: "Not found"}, {status: 404})
}
