"use client";

interface ProductErrorComponentProps {
  message: string;
}
export const ProductErrorComponent = ({
  message,
}: ProductErrorComponentProps) => (
  <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-600">{message}</p>
    <button
      className="mt-2 text-sm text-red-700 hover:underline"
      onClick={() => window.location.reload()}
    >
      Retry
    </button>
  </div>
);
