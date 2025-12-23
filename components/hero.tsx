import Image from "next/image";
import hero from "@/images/hero.png"

export default function Hero() {
  return (
    <section className="w-full p-4 md:p-12 flex flex-col md:flex-row md:justify-between gap-10 md:mt-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-[-0.033em] text-white">
          Streamline <br />{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">
            Inventory
            <span className="text-white block md:inline-block mt-2 ml-3">Ops.</span>
          </span>
        </h1>
        <p className="text-lg text-text-muted font-normal leading-relaxed max-w-135">
          Automate your workflow, reduce errors by 95%, and grow your business
          with the intelligent inventory platform built for the modern dark mode
          era.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          <button className="group relative px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white md:text-md shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 w-full">
            Get Started
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-1" />
          </button>

          <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white md:text-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full">
            Watch Demo
          </button>
        </div>
      </div>
      <div className="md:w-150">
        <Image src={hero} alt="two men in a warehouse" className="w-full h-full object-cover rounded-2xl"/>
      </div>
    </section>
  );
}
