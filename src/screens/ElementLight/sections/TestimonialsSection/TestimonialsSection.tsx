import { useEffect, useState, type JSX } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

export const TestimonialsSection = (): JSX.Element => {
  const [/*currentSlide,*/ setCurrentSlide] = useState(0);

  // Testimonial data for mapping
  const testimonials = [
    {
      id: 1,
      quote:
        '"احجزت سباك في أقل من 5 دقائق — وحضر في نفس اليوم! هذه المنصة منقذ للحياة."',
      name: "— سامي أ.، الجزائر",
      position: "الرئيس التنفيذي في تيك فلو سوليوشنز",
      avatar: "/ja6vnrdyxr6dop2is9crmnsqxso-jpg.png",
    },
    {
      id: 2,
      quote:
        '"مع الذكاء الاصطناعي، قللنا العمل اليدوي وحسننا الدقة. فريقنا الآن يركز على المهام عالية التأثير بينما تتعامل الأتمتة مع الباقي!"',
      name: "صوفيا مارتينيز",
      position: "مدير العمليات في نيكسا كورب",
      avatar: "/prjvkx4ybef6ysyzs9ezdabpto-jpg.png",
    },
    {
      id: 3,
      quote:
        '"سهل الاستخدام جداً، وكل مقدم خدمة استأجرته حتى الآن كان محترفاً وفي الموعد. أوصي به بشدة!"',
      name: "— فاطمة ز.، وهران",
      position: "رئيس المبيعات في جروث بيك",
      avatar: "/hdiezwzzph6mztbfyg3fs721u-jpg.png",
    },
    {
      id: 4,
      quote:
        '"كان لدي طارئ مع الكهرباء، والتطبيق وجد شخصاً على بعد مبنيين. تم الإصلاح في وقت قياسي!"',
      name: "— ياسين ب.، قسنطينة",
      position: "قائد نجاح العملاء في سابورت هايف",
      avatar: "/ja6vnrdyxr6dop2is9crmnsqxso-jpg-1.png",
    },
  ];

  // Client profiles for sliding animation
  const clientProfiles = [
    { name: "أحمد محمد", company: "شركة التقنية المتقدمة", avatar: "👨‍💼" },
    { name: "فاطمة علي", company: "مؤسسة الخدمات الرقمية", avatar: "��‍💻" },
    { name: "محمد حسن", company: "مجموعة التطوير الذكي", avatar: "👨‍🔧" },
    { name: "سارة أحمد", company: "شركة الحلول المتكاملة", avatar: "👩‍🏭" },
    { name: "علي محمود", company: "مؤسسة الابتكار التقني", avatar: "👨‍💡" },
    { name: "نور الدين", company: "شركة الخدمات الذكية", avatar: "👩‍⚡" },
    { name: "يوسف كريم", company: "مجموعة التكنولوجيا الحديثة", avatar: "👨‍🚀" },
    { name: "ليلى محمد", company: "شركة الحلول الرقمية", avatar: "👩‍🎯" },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      //setCurrentSlide((prev) => (prev + 1) % clientProfiles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [clientProfiles.length]);

  // Star rating component
  const StarRating = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-yellow-400 text-lg"
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="flex flex-col items-center justify-center gap-[60px] px-10 py-[100px] w-full">
      <div className="flex flex-col w-full max-w-[1840px] items-center justify-center gap-[25px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-[1]"
        >
          <Badge className="relative px-3 py-2 bg-loving-help-337691framerappcod-gray-80 text-white font-medium text-sm tracking-[-0.28px] leading-[16.8px] border border-solid border-[#222222]">
            آراء العملاء
          </Badge>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col w-full items-center justify-center gap-[15px] relative z-0"
        >
          <div className="flex flex-col max-w-[700px] w-full items-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-greta font-normal text-white text-[50px] text-center tracking-[-2.00px] leading-[55px]"
            >
              ماذا يقول عملاؤنا
              <br />
              <span className="gradient-text font-greta">عن منصتنا</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col max-w-[600px] w-full items-center"
          >
            <p className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-lg text-center tracking-[-0.36px] leading-[27px]">
              شركات حقيقية، نتائج حقيقية مع أتمتة الذكاء الاصطناعي.
            </p>
          </motion.div>
        </motion.div>

        {/* Client Trust Section with Auto-sliding Profiles */}
        
      </div>

      {/* Testimonials Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1000px] w-full"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="flex flex-col items-start justify-center rounded-lg border border-[#222222] overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm hover:from-gray-800/90 hover:to-gray-700/50 transition-all duration-300">
            <CardContent className="flex flex-col items-start justify-center gap-5 p-[30px] w-full">
                <StarRating />

              <div className="w-full overflow-hidden">
                  <p className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-[16px] tracking-[-0.32px] leading-[22.4px]">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full">
                  <Avatar className="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-gray-600">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                      className="rounded-full object-cover"
                  />
                    <AvatarFallback className="rounded-full bg-gray-700 text-white">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 h-[38.39px] relative">
                  <div className="absolute -top-px left-0 w-full">
                      <p className="font-['Tajawal',sans-serif] font-medium text-white text-[16px] tracking-[-0.32px] leading-[22.4px]">
                      {testimonial.name}
                    </p>
                  </div>

                  <div className="absolute top-[26px] left-0 w-full">
                      <p className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-xs tracking-[-0.48px] leading-3">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
