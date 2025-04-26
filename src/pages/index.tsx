import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold">Welcome to StockVision</h1>
        <p>Your AI-powered investment assistant.</p>
      </main>
    </>
  );
}
