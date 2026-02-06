import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">404</h1>
          <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Oops! Nothing to eat here.
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            The food you are looking for seems to have expired or doesn't exist.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-4 opacity-50">
            <div className="text-4xl animate-bounce delay-100">🍎</div>
            <div className="text-4xl animate-bounce delay-300">🥑</div>
            <div className="text-4xl animate-bounce delay-500">🥕</div>
        </div>
      </div>
    </div>
  )
}
