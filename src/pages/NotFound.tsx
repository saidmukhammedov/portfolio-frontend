import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-7xl font-extrabold text-blue-600 mb-2">404</h1>
      <p className="text-xl font-semibold mb-6">Sahifa topilmadi</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
