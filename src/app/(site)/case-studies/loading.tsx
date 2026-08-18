export default function CaseStudiesLoading() {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Hero skeleton */}
      <div className="bg-[#091E17] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto space-y-4">
          <div className="h-7 w-40 bg-white/10 animate-pulse rounded-lg" />
          <div className="h-16 w-2/3 bg-white/10 animate-pulse rounded-lg" />
          <div className="h-5 w-96 bg-white/10 animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Stats strip skeleton */}
      <div className="bg-[#00D261] border-b-[2.5px] border-black px-4 sm:px-6 py-6">
        <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center space-y-2">
              <div className="h-10 w-24 bg-black/10 animate-pulse rounded-lg mx-auto" />
              <div className="h-3 w-16 bg-black/10 animate-pulse rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="px-4 sm:px-6 py-14">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="neo-box bg-white overflow-hidden">
              <div className="h-52 bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 bg-gray-200 animate-pulse rounded" />
                  <div className="h-12 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
