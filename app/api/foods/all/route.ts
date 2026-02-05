import {NextRequest} from "next/server";
import {foods} from "@/app/data";


export async function GET(request: NextRequest) {
    return Response.json(foods)
}