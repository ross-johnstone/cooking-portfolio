export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Tailwind + Dark Mode Test</h1>
      <p className="text-gray-600 dark:text-gray-300">
        If dark mode works, this text will change colour.
      </p>
      <div className="w-40 h-40 rounded-lg bg-blue-500 dark:bg-orange-400" />
    </main>
  );
}
