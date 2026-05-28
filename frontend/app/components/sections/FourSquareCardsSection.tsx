// app/components/sections/FourSquareCardsSection.tsx

"use client";

import { motion } from "framer-motion";

const cards = [
  {
    alt: "Carbon Credit จากโครงการ T-VER คืออะไร ?",

    title: (
      <>
        Carbon Credit จากโครงการ{" "}
        <span className="whitespace-nowrap">T-VER</span> คืออะไร ?
      </>
    ),

    description: (
      <>
        ปริมาณก๊าซเรือนกระจกที่ลด/กักเก็บได้จากการดำเนินโครงการ{" "}
        <span className="whitespace-nowrap">T-VER</span>{" "}
        สามารถนำไปใช้ชดเชยการปล่อยก๊าซเรือนกระจก
        หรือซื้อ-ขายในตลาดคาร์บอนภาคสมัครใจได้
      </>
    ),

    image: "/images/four-block-1.jpg",
  },

  {
    alt: "รู้หรือไหมว่า…ตัวเราเองปล่อยคาร์บอนเท่าไหร่?",

    title: "รู้หรือไหมว่า…ตัวเราเองปล่อยคาร์บอนเท่าไหร่?",

    description:
      "เรามาร่วมลดคาร์บอน เพื่อส่งผลต่อภาวะโลกร้อน และถ้าอยากชดเชยคาร์บอน ก็ทำได้เลยผ่านการซื้อคาร์บอนเครดิต",

    image: "/images/four-block-2.jpg",
  },
];

export default function FourSquareCardsSection() {
  return (
    <section className="w-full overflow-hidden">
      <div className="flex flex-col">
        {cards.map((card, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className="w-full">
              <div
                className={`
                  flex flex-col
                  lg:flex-row
                  ${!isEven ? "lg:flex-row-reverse" : ""}
                `}
              >
                {/* IMAGE */}
                <div
                  className="
                    relative
                    h-[280px]
                    w-full
                    overflow-hidden

                    sm:h-[360px]

                    lg:h-auto
                    lg:w-1/2
                  "
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </div>

                {/* TEXT SIDE */}
                <div
                  className={`
                    flex
                    w-full
                    items-center

                    px-6
                    py-12

                    sm:px-10
                    sm:py-16

                    lg:w-1/2
                    lg:px-[6vw]
                    lg:py-20

                    ${isEven ? "bg-[#FF7A5A]" : "bg-[#FFB85F]"}
                  `}
                >
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.35 }}
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.16,
                        },
                      },
                    }}
                    className="w-full"
                  >
                    {/* TITLE */}
                    <motion.h3
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 18,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        mb-4
                        text-[16px]
                        font-semibold
                        leading-[1.4]
                        text-[#462066]

                        sm:text-[18px]

                        lg:text-[clamp(20px,1.6vw,28px)]
                      "
                    >
                      {card.title}
                    </motion.h3>

                    {/* DESCRIPTION */}
                    <div
                      className="
                        max-w-full
                        lg:max-w-[420px]
                        xl:max-w-[30vw]
                      "
                    >
                      <motion.p
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 26,
                          },
                          show: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                        transition={{
                          duration: 1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                          text-[18px]
                          font-medium
                          leading-[1.22]
                          text-[#FCF4D9]

                          sm:text-[22px]

                          lg:text-[clamp(24px,2vw,36px)]
                        "
                      >
                        {card.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}