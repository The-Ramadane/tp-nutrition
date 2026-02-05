"use client"

import {IFood, IMacronutrientData} from "@/app/types";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import { Pie, PieChart, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-sm font-medium">{`${value}g`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
                {`(${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function FoodPage() {
    const [food, setFood] = useState<IFood | null>(null)
    const [activeIndex, setActiveIndex] = useState(0);
    const params = useParams()
    const router = useRouter()
    // On récupère l'ID depuis l'URL (qui est maintenant un ID numérique)
    const id = params.name as string 

    useEffect(() => {
        const fetchFood = async () => {
            if (!id) return
            try {
                // On appelle l'API avec l'ID
                const response = await fetch(`/api/foods/${id}`)
                if (!response.ok) {
                    console.error("Failed to fetch food")
                    return
                }
                const data = await response.json()
                setFood(data)
            } catch (e) {
                console.error(e)
            }
        }
        fetchFood()
    }, [id]);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    if (!food) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    )

    const macroData: IMacronutrientData[] = [
        { name: 'carbohydrates', value: food.carbohydrates },
        { name: 'protein', value: food.protein },
        { name: 'fat', value: food.fat },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Button 
                    variant="ghost" 
                    onClick={() => router.back()}
                    className="mb-6 hover:bg-gray-100"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to search
                </Button>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
                        <h1 className="text-4xl font-bold mb-2">{food.name}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                {food.calories} kcal / 100g
                            </span>
                            {food.fiber && (
                                <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                                    Fiber: {food.fiber}g
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Chart Section */}
                        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Macronutrients Distribution</h3>
                            <div className="w-full h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            data={macroData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            onMouseEnter={onPieEnter}
                                            paddingAngle={5}
                                        >
                                            {macroData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Nutritional Values (per 100g)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-500">Carbohydrates</p>
                                        <p className="text-xl font-bold text-blue-600">{food.carbohydrates}g</p>
                                        {food.sugar && <p className="text-xs text-gray-400">Sugar: {food.sugar}g</p>}
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-500">Protein</p>
                                        <p className="text-xl font-bold text-green-600">{food.protein}g</p>
                                    </div>
                                    <div className="bg-yellow-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-500">Fat</p>
                                        <p className="text-xl font-bold text-yellow-600">{food.fat}g</p>
                                    </div>
                                    {food.fiber && (
                                        <div className="bg-purple-50 p-3 rounded-lg">
                                            <p className="text-sm text-gray-500">Fiber</p>
                                            <p className="text-xl font-bold text-purple-600">{food.fiber}g</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {(food.vitamins || food.minerals) && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Micronutrients</h3>
                                    <div className="space-y-3">
                                        {food.vitamins && (
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 block mb-1">Vitamins</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {food.vitamins.map((v) => (
                                                        <span key={v} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md">
                                                            {v}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {food.minerals && (
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 block mb-1">Minerals</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {food.minerals.map((m) => (
                                                        <span key={m} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                                                            {m}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
