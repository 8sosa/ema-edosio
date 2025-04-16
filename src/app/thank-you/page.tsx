export default function Page() {
  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="bg-white text-black rounded-2xl shadow-lg p-10 max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-semibold">Thank you for your purchase!</h1>
        <p className="text-lg text-gray-700">
          Your order has been received. You can view your orders anytime on your{" "}
          <a href="/dashboard" className="text-blue-600 hover:underline">
            dashboard
          </a>.
        </p>
        <p className="text-sm text-gray-500">We appreciate your support.</p>
      </div>
    </section>
  );
}
