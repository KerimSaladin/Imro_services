import { type JSX } from "react";
//import { Button } from "../../../../components/ui/button";
//import { Input } from "../../../../components/ui/input";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logoImmro from "../../../../assets/logoImmro.png";

export const MainContentSection = (): JSX.Element => {
  return (
    <footer className="w-full flex flex-col items-start relative border-t-2 border-[#222222]">
      <div className="w-full px-10 py-16 [background:radial-gradient(50%_50%_at_50%_3%,rgba(12,29,220,0.3)_0%,rgba(12,29,220,0)_100%)] flex flex-col items-center justify-center">
        <div className="flex max-w-[1200px] items-start justify-center gap-8 w-full">
          {/* Left column with logo, tagline and newsletter */}
          <div className="flex-1 flex flex-col items-start justify-center gap-[15px]">
            {/* Logo section */}
            <div className="flex flex-col items-start justify-center gap-[19.19px] w-full">
              <div className="inline-flex items-center gap-2">
                <img className="w-12 h-20" alt="IMRO Logo" src={logoImmro} />
                <div className="[font-family:'Figtree',Helvetica] font-bold text-white text-3xl tracking-[-0.54px] leading-9">
                  IMRO
                </div>
              </div>

              <div className="max-w-[400px]">
                <p className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-base leading-relaxed">
                  منصة IMRO تجمعك بأفضل مقدمي الخدمات في منطقتك. نقدم خدمات التنظيف والسباكة والأعمال الكهربائية والميكانيكية بجودة عالية وأسعار منافسة.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-start justify-center gap-3 w-full mt-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400 font-['Tajawal',sans-serif] text-sm">+213 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400 font-['Tajawal',sans-serif] text-sm">info@imro.dz</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-gray-400 font-['Tajawal',sans-serif] text-sm">بشار، الجزائر</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 space-x-reverse mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right columns with links */}
          <div className="flex-1 flex items-start justify-center gap-8">
            {/* Services */}
            <div className="flex flex-col items-start justify-center gap-3">
              <h3 className="font-greta font-bold text-white text-lg">
                خدماتنا
              </h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  التنظيف
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  السباكة
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  الأعمال الكهربائية
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  الميكانيكا
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  خدمات أخرى
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col items-start justify-center gap-3">
              <h3 className="font-greta font-bold text-white text-lg">
                الشركة
              </h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  من نحن
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  قصص النجاح
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  الأسعار
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  اتصل بنا
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="flex flex-col items-start justify-center gap-3">
              <h3 className="font-greta font-bold text-white text-lg">
                الدعم
              </h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  المساعدة
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  سياسة الخصوصية
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  شروط الاستخدام
                </a>
                <a href="#" className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm hover:text-white transition-colors duration-300">
                  سياسة الاسترداد
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 w-full max-w-[1200px]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 font-['Tajawal',sans-serif] text-sm">
              © 2025 IMRO. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-['Tajawal',sans-serif] text-sm">سياسة الخصوصية</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-['Tajawal',sans-serif] text-sm">شروط الاستخدام</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 font-['Tajawal',sans-serif] text-sm">سياسة الاسترداد</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
