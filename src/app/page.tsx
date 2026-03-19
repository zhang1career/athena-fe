import { GroupWinnerScreen } from "@/features/worldcup";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          ⚽ 足球世界杯
        </h1>
        <p className="text-gray-600">小组赛预测、出线分析</p>
      </header>
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <GroupWinnerScreen />
      </section>
    </main>
  );
}
