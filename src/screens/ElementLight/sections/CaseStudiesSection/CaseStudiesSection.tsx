import React, { useState, type JSX } from "react";
import { motion } from "framer-motion";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../../components/ui/button";

export const CaseStudiesSection = (): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Case studies data
  const caseStudies = [
    {
      id: 1,
      title: "قصة نجاح عائلة أحمد",
      description: "وجدنا سباكاً محترفاً في أقل من 10 دقائق لحل مشكلة الطوارئ في منزلنا",
      icon: "🏠",
      category: "سباكة طوارئ",
      result: "تم الإصلاح في ساعة واحدة",
    },
    {
      id: 2,
      title: "مطعم السعادة",
      description: "منصة التنظيف ساعدتنا في الحفاظ على معايير النظافة العالية",
      icon: "🍽️",
      category: "تنظيف تجاري",
      result: "زيادة في تقييمات العملاء",
    },
    {
      id: 3,
      title: "فيلا الشاطئ",
      description: "خدمة الكهرباء الاحترافية أنقذت عطلتنا العائلية",
      icon: "🏖️",
      category: "أعمال كهربائية",
      result: "إصلاح فوري وآمن",
    },
    {
      id: 4,
      title: "فيلا الشاطئ",
      description: "خدمة الكهرباء الاحترافية أنقذت عطلتنا العائلية",
      icon: "🏖️",
      category: "أعمال كهربائية",
      result: "إصلاح فوري وآمن",
    },
  ];

  const totalSlides = Math.ceil(caseStudies.length / 3);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentCases = () => {
    const startIndex = currentSlide * 3;
    return caseStudies.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-[60px] px-10 py-[100px] w-full">
      <div className="flex flex-col items-center justify-center gap-[25px] max-w-[1840px] w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex flex-col items-start relative"
        >
          <Badge className="relative px-3 py-2 bg-loving-help-337691framerappcod-gray-80 text-white rounded-md border border-solid border-[#222222]">
            <span className="font-['Tajawal',sans-serif] font-medium text-sm tracking-[-0.28px] leading-[16.8px]">
              قصص نجاح
            </span>
          </Badge>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-[15px] w-full"
        >
          <div className="flex flex-col max-w-[700px] w-full items-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-greta font-normal text-white text-[50px] text-center tracking-[-2.00px] leading-[55px]"
            >
              كيف ساعدت منصتنا
              <br />
              <span className="gradient-text font-greta">آلاف العائلات</span>
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
              قصص حقيقية من عملائنا الذين وجدوا الحلول المثالية لاحتياجاتهم اليومية.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full max-w-[1200px]">
        {/* Cases Grid */}
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {getCurrentCases().map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
            >
              <Card className="w-full h-[300px] border-[#222222] bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm hover:from-gray-800/90 hover:to-gray-700/50 transition-all duration-300">
                <CardContent className="p-6 h-full flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    className="text-4xl mb-4 text-center"
                  >
                    {study.icon}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="mb-3">
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30 text-xs mb-2">
                        {study.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-white font-greta mb-2">
                        {study.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 font-['Tajawal',sans-serif] text-sm mb-4 flex-1">
                      "{study.description}"
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 text-green-400 text-sm font-['Tajawal',sans-serif]">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {study.result}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8 ">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-500 w-6' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              title={`انتقل إلى الشريحة رقم ${index + 1}`}
              aria-label={`انتقل إلى الشريحة رقم ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Swipe Hint with Navigation Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-4 w-full"
      >
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Button
            onClick={prevSlide}
            className="bg-gray-900/80 border-gray-600 hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center">
            <span className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm tracking-[-0.28px] leading-[16.8px]">
              اسحب لاستكشاف المزيد
            </span>
          </div>
        </div>

        <motion.div
          animate={{ x: [5, -5, 5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Button
            onClick={nextSlide}
            className="bg-gray-900/80 border-gray-600 hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

