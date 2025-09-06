export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutrals-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-400 border-solid"></div>
      <span className="sr-only">جارٍ التحميل...</span>
    </div>
  );
}
