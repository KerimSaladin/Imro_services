import { ArrowRightIcon } from "lucide-react";
import React, { type JSX } from "react";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import logoImmro from "../../../../assets/logoImmro.png";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative h-[100vh] flex flex-col items-center justify-center w-full pt-[180px] pb-[100px] px-10">
      {/* Spline background with overlay */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <iframe 
          src='https://my.spline.design/animatedbackgroundgradientforweb-TsHMNAtoaFwHxkjBxa4JhAfe/' 
          frameBorder='0' 
          width='100%' 
          height='100%' 
          className="absolute inset-0"
        />
        {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" /> Overlay for better content visibility */}
      </div>

      {/* Content container */}
      <div className="flex flex-col items-center justify-center gap-[25px] z-[3]">
        {/* New badge */}
        <div 
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.6 }}
          className="inline-flex items-start relative"
        >
          <Badge className="flex items-center gap-[5px] px-2 pr-0.5 py-0.5 bg-gray-900/80 rounded-[20px] border border-solid border-gray-700 backdrop-blur-sm">
            <span className="inline-flex items-center justify-center px-2 py-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl">
              <span className="font-['Tajawal',sans-serif] font-medium text-white text-sm tracking-[-0.28px] leading-[16.8px]">
                جديد
              </span>
            </span>
            <span className="font-['Tajawal',sans-serif] font-medium text-white text-sm tracking-[-0.28px] leading-[16.8px]">
              عروض خاصة
            </span>
          </Badge>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center gap-[25px] max-w-[1840px] w-full z-[2]">
          {/* Heading */}
          <div 
            // initial={{ opacity: 0, y: 30 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-2.5 w-full"
          >
            <div className="flex flex-col max-w-[1000px] w-full items-center text-center">
              <h1 className="font-greta font-extrabold text-white text-[70px] tracking-[-2.20px] leading-[77px]">
                منصة تجمعك بأفضل{" "}
                <span className="gradient-text font-greta">
                  مقدمي الخدمات
                </span>
                <br />
                في منطقتك{" "}
                <span className="bg-gradient-to-r font-greta from-blue-400 to-orange-400 bg-clip-text text-transparent">
                  فوراً
                </span>
                .
              </h1>
            </div>

            {/* Description text */}
            <div 
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col max-w-[600px] w-full items-center mt-6"
            >
              <p className="font-['Tajawal',sans-serif] font-bold text-[#cccccc] text-lg text-center tracking-[-0.36px] leading-[27px]">
                تواصل مع محترفين معتمدين للتنظيف والسباكة والأعمال الكهربائية والمزيد — كل ذلك في منصة سهلة الاستخدام مصممة للسرعة والأمان والموثوقية.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-[15px] p-0.5"
          >
            <Link to="/book-call">
              <Button className="flex items-center justify-center gap-[5px] px-[13px] py-[9px] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-md border border-solid border-orange-400/20 shadow-lg hover:shadow-orange-500/25 transition-all duration-300">
                <span className="font-['Tajawal',sans-serif] font-medium text-white text-[15px] tracking-[-0.60px] leading-[18px]">
                  تواصل معنا
                </span>
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              className="flex items-center justify-center px-[13px] py-[9px] bg-gray-900/80 hover:bg-gray-800/80 rounded-md border border-solid border-gray-600 shadow-lg backdrop-blur-sm transition-all duration-300"
              onClick={() => {
                const section = document.getElementById('services');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="text-black font-['Tajawal',sans-serif] font-medium text-[15px] tracking-[-0.60px] leading-[18px]">
                عرض الخدمات
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};