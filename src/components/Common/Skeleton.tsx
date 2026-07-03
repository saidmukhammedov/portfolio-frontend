export default function Skeleton() {
  return (
    <div className="border rounded-xl p-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
      </div>
    </div>
  );
}
