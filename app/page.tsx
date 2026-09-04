import NameTitle from "./components/NameTitle";
import PicsSection from "./components/PicsSection";

export default function Home() {
  return (
    <main className='min-h-screen'>
      <PicsSection />
      <NameTitle />
    </main>
  );
}
