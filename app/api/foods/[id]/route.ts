import {foods} from "@/app/data";


export async function GET(request: Request, {params} :{params : {name : string}} ){
    const index = foods.findIndex((f) => f.name.toLowerCase().replace(/\s/g, '-' ) === params.name)

    if (index !== -1)
        return new  Response(JSON.stringify(foods[index]), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        })
    else
        return new Response(JSON.stringify(foods[index]), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 404
        })
}