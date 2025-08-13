export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-4 text-lg text-gray-600">Thank you for your subscription.</p>
        <a href="/pricing" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">
          Back to Pricing
        </a>
      </div>
    </div>
  );
}