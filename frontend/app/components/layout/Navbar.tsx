import Image from "next/image";
import { Globe } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-white/10
        bg-[#FCF4D9]
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      "
    >
      <div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-[1440px]
          items-center
          justify-between

          h-[78px]

          px-5

          sm:h-[88px]
          sm:px-8

          md:h-[96px]
          md:px-10

          lg:h-[104px]
          lg:px-12

          xl:h-[112px]

          2xl:h-[118px]
        "
      >
        {/* LEFT SPACE */}
        <div className="w-[90px] md:w-[120px]" />

        {/* CENTER LOGO */}
<div className="absolute left-1/2 -translate-x-1/2">
  <Image
    src="/images/logo.png"
    alt="T-VER Logo"
    width={220}
    height={70}
    priority
    className="
      h-auto

      w-[120px]

      sm:w-[140px]

      md:w-[170px]

      lg:w-[200px]

      xl:w-[220px]
    "
  />
</div>

        {/* RIGHT LANGUAGE */}
        <div className="ml-auto flex items-center">
          <button
            className="
              flex
              items-center
              justify-center
              gap-2.5

              rounded-full
              bg-white

              font-[700]
              tracking-[0.08em]

              text-[#00AAA0]

              shadow-[0_6px_18px_rgba(0,0,0,0.12)]

              transition-all
              duration-300

              hover:scale-[1.03]
              hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)]

              px-4
              py-2
              text-sm

              sm:px-5
              sm:py-2.5
              sm:text-base

              md:px-6
              md:py-3

              lg:px-7
              lg:py-3.5
              lg:text-[17px]
            "
          >
            <Globe
              className="
                h-4
                w-4

                sm:h-5
                sm:w-5
              "
              strokeWidth={2.2}
            />

            <span>TH</span>
          </button>
        </div>
      </div>
    </header>
  );
}