interface Props {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-stone-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-stone-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/4 rounded bg-stone-100" />
        <div className="h-4 w-3/4 rounded bg-stone-100" />
        <div className="h-3 w-full rounded bg-stone-100" />
        <div className="h-3 w-2/3 rounded bg-stone-100" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 w-16 rounded bg-stone-100" />
          <div className="h-9 w-9 rounded-full bg-stone-100" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGridSkeleton({ count = 8 }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
