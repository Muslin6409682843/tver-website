export default function SolarCellComingSoon() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#241006]">

      {/* Background Glow */}
      <div className="absolute left-[-150px] top-[-100px] h-[500px] w-[500px] rounded-full bg-[#FF8C00]/15 blur-[150px]" />

      <div className="absolute right-[-200px] bottom-[-150px] h-[550px] w-[550px] rounded-full bg-[#FFB347]/10 blur-[170px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#ffffff 1px,transparent 1px),
            linear-gradient(to bottom,#ffffff 1px,transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* Coming Soon */}
      <div className="relative text-center">

        <h1 className="text-5xl font-bold tracking-[0.18em] text-white md:text-7xl">
          COMING
          <span className="block bg-gradient-to-r from-[#FFD08A] via-[#FFB347] to-[#FF7A5A] bg-clip-text text-transparent">
            SOON
          </span>
        </h1>

      </div>

    </main>
  );
}