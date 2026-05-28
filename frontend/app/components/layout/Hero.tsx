export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-black
      "
    >
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        <source src="/videos/home-hero.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/45
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1440px]
          items-center
          justify-center
          px-6
          text-center

          min-h-[72vh]

          sm:min-h-[74vh]

          md:min-h-[76vh]

          lg:min-h-[78vh]

          xl:min-h-[80vh]
        "
      >
        <div className="max-w-[1100px]">
          <h1
            className="
              mt-4
              font-[500]
              tracking-[0.02em]
              text-white/90

              text-[16px]

              sm:mt-5
              sm:text-[20px]

              md:mt-6
              md:text-[24px]

              lg:text-[30px]

              xl:text-[34px]
            "
          >
            T-VER ทำแล้วได้อะไร
          </h1>

          <p
            className="
              font-[700]
              leading-[1.15]
              tracking-[-0.03em]
              text-white
              drop-shadow-[0_6px_30px_rgba(0,0,0,0.45)]

              text-[28px]

              sm:text-[40px]

              md:text-[54px]

              lg:text-[66px]

              xl:text-[78px]
            "
          >
            มาติดตามตอนต่อไป
          </p>
        </div>
      </div>
    </section>
  );
}