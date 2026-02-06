import {NextRequest} from "next/server";
import {foods} from "@/data";


export async function GET(request: NextRequest) {
    return Response.json(foods)
}