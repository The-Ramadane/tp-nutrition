import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button skeleton */}
        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header skeleton */}
          <div className="bg-gray-200 p-8 h-40 animate-pulse">
            <Skeleton className="h-10 w-3/4 mb-4 bg-gray-300" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-32 rounded-full bg-gray-300" />
              <Skeleton className="h-8 w-32 rounded-full bg-gray-300" />
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Details Section skeleton */}
            <div className="space-y-6 col-span-2">
              <div>
                <Skeleton className="h-8 w-64 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-24 rounded-lg" />
                  ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-8 w-24 rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
