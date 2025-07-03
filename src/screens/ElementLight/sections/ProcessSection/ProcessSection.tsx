import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import type { JSX } from "react/jsx-runtime";

export const ProcessSection = (): JSX.Element => {
  // Process steps data for service platform
  const processSteps = [
    {
      step: "الخطوة 1",
      title: "اختر الخدمة",
      description: "اختر من بين مجموعة واسعة من الخدمات المنزلية والمهنية.",
      content: (
        <div className="flex h-[180px] items-center justify-center p-2.5 relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="grid grid-cols-2 gap-3 w-full max-w-[300px] pb-8">
              {[
                { name: "التنظيف", icon: "🧹" },
                { name: "السباكة", icon: "🔧" },
                { name: "الكهرباء", icon: "⚡" },
                { name: "الميكانيكا", icon: "🚗" },
              ].map((service, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-white text-sm font-medium font-['Tajawal',sans-serif]">{service.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "الخطوة 2",
      title: "حدد المواصفات",
      description: "حدد تفاصيل الخدمة المطلوبة والمواعيد المناسبة لك.",
      content: (
        <div className="flex h-[180px] items-center justify-center p-2.5 relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-col gap-3 w-full max-w-[300px] pb-8">
              {[
                { icon: "📅", text: "اختر التاريخ والوقت", color: "text-blue-400" },
                { icon: "📍", text: "حدد موقع الخدمة", color: "text-green-400" },
                { icon: "📝", text: "أضف التفاصيل المطلوبة", color: "text-orange-400" },
                ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <span className={item.color}>{item.icon}</span>
                  <span className="text-white text-sm font-['Tajawal',sans-serif]">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "الخطوة 3",
      title: "احصل على عروض",
      description: "احصل على عروض من محترفين معتمدين في منطقتك.",
      content: (
        <div className="flex h-[220px] items-center justify-center p-2.5 relative w-full">
          <div className="flex flex-col items-center justify-center gap-5 w-full">
            <br/>
            <div className="flex flex-col gap-3 w-full py-4 max-w-[300px] pb-8">
              {[
                { name: "أحمد محمد", rating: "⭐ 4.9", price: "1500 دينار" },
                { name: "محمد علي", rating: "⭐ 4.8", price: "1400 دينار" },
                { name: "علي أحمد", rating: "⭐ 4.7", price: "1600 دينار" },
              ].map((provider, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium font-['Tajawal',sans-serif]">{provider.name}</span>
                    <span className="text-yellow-400 text-sm font-['Tajawal',sans-serif]">{provider.rating}</span>
                  </div>
                  <span className="text-green-400 font-bold font-['Tajawal',sans-serif]">{provider.price}</span>
                </motion.div>
                ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "الخطوة 4",
      title: "احجز وادفع",
      description: "اختر المحترف المناسب واحجز الخدمة بسهولة وأمان.",
      content: (
        <div className="flex h-[220px] items-center justify-center p-2.5 relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <br/>
            <div className="flex flex-col items-center gap-3 w-full max-w-[300px] pb-8">
              {[
                { icon: "✅", text: "تم اختيار المحترف", bgClass: "bg-green-800/30", borderClass: "border-green-600", textClass: "text-green-400" },
                { icon: "💳", text: "دفع آمن ومشفر", bgClass: "bg-blue-800/30", borderClass: "border-blue-600", textClass: "text-blue-400" },
                { icon: "📱", text: "تأكيد الحجز", bgClass: "bg-orange-800/30", borderClass: "border-orange-600", textClass: "text-orange-400" },
            ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-2 p-3 ${item.bgClass} rounded-lg border ${item.borderClass}`}
                >
                  <span className={`${item.textClass} text-2xl`}>{item.icon}</span>
                  <span className="text-white text-sm font-['Tajawal',sans-serif]">{item.text}</span>
                </motion.div>
              ))}
              </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-[60px] px-10 py-[100px] w-full">
      <div className="flex flex-col w-full max-w-[1840px] items-center justify-center gap-[25px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pb-4"
        >
        <Badge
          className="bg-loving-help-337691framerappcod-gray-80 text-white font-medium text-sm tracking-[-0.28px] leading-[16.8px] border-[#222222] rounded-md"
        >
            كيف تعمل المنصة
        </Badge>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col w-full items-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-[50px] font-normal text-center text-white tracking-[-2.00px] leading-[55px] max-w-[700px] font-greta"
          >
            احصل على الخدمات المطلوبة
            <br />
            <span className="gradient-text font-greta">في 4 خطوات بسيطة</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-4 text-lg font-medium text-[#cccccc] text-center tracking-[-0.36px] leading-[27px] max-w-[600px] font-['Tajawal',sans-serif]"
          >
            منصة سهلة الاستخدام تربطك بأفضل المحترفين في منطقتك بسرعة وأمان.
          </motion.p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] w-full">
        {processSteps.map((step, index) => (
          <motion.div
            key={`process-step-${index}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.55,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            <Card className="bg-loving-help-337691framerappcod-gray-80 border-[#222222] rounded-lg overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center gap-5 p-[30px]">
              <div className="flex flex-col w-full items-center justify-center gap-[9.2px]">
                <div className="flex flex-col w-full items-start justify-center gap-2.5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.55 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    className="bg-loving-help-337691framerappcod-gray-80 text-white font-medium text-xs tracking-[-0.48px] leading-3 border-[#222222] rounded"
                  >
                    {step.step}
                  </Badge>

                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.55 + 0.4 }}
                    viewport={{ once: true }}
                    className="self-stretch mt-[-1.00px] font-greta font-bold text-white text-[23px] tracking-[-0.46px] leading-[27.6px]"
                  >
                    {step.title}
                  </motion.h3>
                </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.55 + 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col w-full items-start"
                  >
                    <p className="self-stretch mt-[-1.00px] mb-4 font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-[16px] tracking-[-0.32px] leading-[22.4px]">
                    {step.description}
                  </p>
                  </motion.div>
              </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.55 + 0.8 }}
                  viewport={{ once: true }}
                >
              {step.content}
                </motion.div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
