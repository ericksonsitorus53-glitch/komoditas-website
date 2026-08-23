export default function ProductCardSkeleton() {
  return (
    <div className="card animate-pulse">
      {/* Image Skeleton */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Category & Origin */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-5 w-1/2 bg-gray-200 rounded mb-3" />

        {/* Description */}
        <div className="space-y-1.5 mb-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-28 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
