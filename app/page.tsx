"use client"


import { Button } from "@/components/ui/button"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
} from "@/components/ui/combobox"

import {useEffect, useState} from "react";
import {IFood, IFoodReduced} from "@/app/types";
import {useRouter} from "next/navigation";
import { Spinner } from "@/components/ui/spinner"



export default function Home() {
    const [food, setFood] = useState<IFoodReduced[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [value, setValue] = useState<string | null>(null)
    const router = useRouter()
    const fechFoods = async ()=>{
        try {
            const response = await fetch("/api/foods/all")
            const data = await response.json()
            const foodsReduced : IFoodReduced[] = data.map((f: IFood) => ({
                value: f.id.toString(),
                label: f.name
            }))
            setFood(foodsReduced)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const initialize = async ()=>{
            await fechFoods()
            setIsLoading(false)
        }
        initialize()

    }, []);

    useEffect(() => {
        if (value)
            router.push(`/food/${value}`)
    }, [value, router]);

  return (
      <>
          {!isLoading ?
              (

                  <div className={"flex flex-col justify-center items-center h-screen  text-white"}>
                      <h1 className={'text-4xl font-extrabold'}> Welcome to Nutripark</h1>
                        <br/>
                      <Combobox items={food} value={value} onValueChange={setValue}>
                          <ComboboxTrigger render={<Button variant="outline" className="w-64 justify-between font-normal text-black">Select food...</Button>} />
                          <ComboboxContent>
                              <ComboboxInput showTrigger={false} placeholder="Search a food" />
                              <ComboboxEmpty>No items found.</ComboboxEmpty>
                              <ComboboxList>
                                  {(item) => (
                                      <ComboboxItem key={item.value} value={item.value}>
                                          {item.label}
                                      </ComboboxItem>
                                  )}
                              </ComboboxList>
                          </ComboboxContent>
                    </Combobox>
                  </div>
              ): (
                  <div className={"flex justify-center items-center h-screen w-full  text-white"}>
                      <Spinner className="size-8" />
                  </div>
              )

          }


      </>
  );
}
