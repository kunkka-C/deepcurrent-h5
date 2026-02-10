export default function CTA() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-center sm:max-w-3xl sm:p-10">
        <h2 className="gradient-text text-center text-[32px] font-bold leading-tight">
          开启智能信息时代
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
          免费开始使用，体验AI驱动的信息获取方式
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button className="w-full rounded-full bg-[#00D4FF] px-8 py-3 text-base font-semibold text-[#0A1628] transition-colors hover:bg-[#00D4FF]/90 sm:w-auto">
            立即开始
          </button>
          <button className="w-full rounded-full border border-white/30 bg-transparent px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 sm:w-auto">
            预约演示
          </button>
        </div>

        <p className="mt-4 text-sm text-white/50">
          免费版包含每日10条AI日报 + 20次搜索
        </p>
      </div>
    </section>
  );
}
