export default function Loading() {
  return (
    <div className="bg-neutrals-100 flex min-h-screen items-center justify-center">
      <div className="border-primary-400 h-12 w-12 animate-spin rounded-full border-t-4 border-solid"></div>
      <span className="sr-only">جارٍ التحميل...</span>
    </div>
  );
}
