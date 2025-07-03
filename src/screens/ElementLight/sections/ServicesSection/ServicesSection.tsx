import {type JSX } from "react";
//import { motion } from "framer-motion";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import cleaning from '../../../../assets/cleaning.png';
import plumbing from '../../../../assets/plumbing.jpg';
import troubling from '../../../../assets/troubling.png';
import Electrecity from '../../../../assets/Electrecity.jpg';
import mechanics from '../../../../assets/mechanics.jpg';


// Service data for mapping
const services = [
  {
    id: 1,
    title: "خدمات التنظيف",
    boldText: "من تنظيف المنزل إلى تنظيف المكتب",
    description: "— احجز محترفين موثوقين يحافظون على مساحاتك نظيفة تماماً.",
    imageUrl: cleaning,
    imagePosition: "left",
    borderRadius: "rounded-[40px]",
  },
  {
    id: 2,
    title: "خدمات السباكة",
    boldText: "تسريبات أو انسدادات أو تركيب؟",
    description: " احصل على سباكين موثوقين عند باب منزلك بسرعة.",
    imageUrl: plumbing,
    imagePosition: "right",
    borderRadius: "rounded-[40px]",
  },
  {
    id: 3,
    title: "الخدمات الكهربائية",
    boldText: "إضاءة أو أسلاك أو إصلاحات عاجلة",
    description: "— استأجر كهربائيين معتمدين لإصلاحات آمنة وسريعة.",
    imageUrl: Electrecity,
    imagePosition: "left",
    borderRadius: "rounded-[18px]",
  },
  {
    id: 4,
    title: "خدمات الطوارئ",
    boldText: "مشاكل في السيارة أو قفل الأبواب؟",
    description: " خبراؤنا في الطوارئ متاحون على مدار الساعة لمساعدتك.",
    imageUrl: troubling,
    imagePosition: "right",
    borderRadius: "rounded-[18px]",
  },
  {
    id: 5,
    title: "خدمات الميكانيكا",
    boldText: "صيانة وإصلاح المركبات",
    description: " يقوم بها ميكانيكيون محليون مؤهلون بأسعار عادلة.",
    imageUrl: mechanics,
    imagePosition: "left",
    borderRadius: "rounded-[40px]",
  },
];

export const ServicesSection = (): JSX.Element => {
   
  return (
    <section id="services" className="flex flex-col items-center bg-black justify-center gap-[60px] px-10 py-[100px] w-full">
      <div className="flex flex-col items-center justify-center gap-[25px] max-w-[1840px] w-full">
        <div className="inline-flex flex-col items-start relative z-[1]">
          <Badge className="px-3 py-2 bg-gray-800 rounded-md border border-solid border-[#222222]">
            <span className="[font-family:'Rubik',sans-serif] font-medium text-white text-sm tracking-[-0.28px] leading-[16.8px]">
              خدماتنا
            </span>
          </Badge>
        </div>

        <div className="relative w-full max-w-[1840px] text-center">
          <div className="flex flex-col items-center justify-center max-w-[700px] mx-auto">
            <h2 className="font-greta font-normal text-white text-[50px] tracking-[-2.00px] leading-[55px] text-center">
              جميع الخدمات المنزلية التي تحتاجها
              <br />
              <span className="gradient-text font-greta inline-block mt-3">في مكان واحد</span>
            </h2>
          </div>

          <div className="flex flex-col max-w-[600px] mx-auto mt-[30px]">
            <p className="[font-family:'Rubik',sans-serif] font-medium text-[#cccccc] text-lg text-center tracking-[-0.36px] leading-[27px]">
              من التنظيف اليومي إلى إصلاحات المنزل العاجلة، منصتنا
              تربطك بمحترفين موثوقين عبر خدمات متعددة — سريعة،
              سهلة، وخالية من المتاعب.
            </p>
          </div>
        </div>

      <div className="flex flex-col max-w-[1000px] w-full items-center justify-center gap-[100px]">
        {services.map((service) => (
          <Card
            key={service.id}
            className="flex flex-wrap w-full items-center justify-center gap-[0px_80px] bg-transparent border-0 shadow-none"
          >
            <CardContent className="p-0 flex flex-wrap w-full items-center justify-center gap-[0px_80px]">
              <img
                className={`relative w-[450px] h-[350px] ${service.borderRadius} object-cover bg-[50%_50%] ${
                  service.imagePosition === "left" ? "order-first" : "order-last"
                }`}
                src={service.imageUrl}
                alt={service.title}
              />
              <div className="flex flex-col w-[470px] h-[350px] items-start justify-center">
                <h3 className="[font-family:'Rubik',sans-serif] font-semibold text-white text-[30px] tracking-[-0.6px] leading-[36px] mb-4">
                  {service.title}
                </h3>
                <p className="[font-family:'Rubik',sans-serif] text-base leading-[22.4px]">
                  <span className="font-bold text-[#cccccc] tracking-[-0.05px]">
                    {service.boldText}
                  </span>
                  <span className="[font-family:'Rubik',sans-serif] text-[#cccccc] text-base leading-[22.4px]">
                    {service.description}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </section>
  );
};