import React, { useEffect, useState, type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../../components/ui/navigation-menu";
import { Separator } from "../../components/ui/separator";
import { useAuth } from "../../contexts/AuthContext";
import { LogOutIcon, UserIcon, ShieldIcon } from "lucide-react";
import { BenefitsSection } from "./sections/BenefitsSection/BenefitsSection";
import { CaseStudiesSection } from "./sections/CaseStudiesSection";
import { FaqsAndCtaSection } from "./sections/FaqsAndCtaSection";
import { HeroSection } from "./sections/HeroSection";
import { MainContentSection } from "./sections/MainContentSection";
import { PricingSection } from "./sections/PricingSection";
import { ProcessSection } from "./sections/ProcessSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import logoImmro from "../../assets/logoImmro.png";

export const ElementLight = (): JSX.Element => {
  const { user, logout } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Client profiles data
  const clientProfiles = [
    { name: "أحمد محمد", company: "شركة التقنية المتقدمة", avatar: "👨‍💼" },
    { name: "فاطمة علي", company: "مؤسسة الخدمات الرقمية", avatar: "👩‍💻" },
    { name: "محمد حسن", company: "شركة الحلول الذكية", avatar: "👨‍🔧" },
    { name: "سارة أحمد", company: "مؤسسة التطوير الحديث", avatar: "👩‍🎨" },
    { name: "علي محمود", company: "شركة الابتكارات الجديدة", avatar: "👨‍🚀" },
    { name: "نور الدين", company: "مؤسسة الخدمات المتكاملة", avatar: "👨‍⚕️" },
  ];

  // Auto-slide effect - DISABLED FOR SCREENSHOT
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % (clientProfiles.length + 1));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [clientProfiles.length]);
  
  // Navigation menu items
  const navItems = [
    { label: "الرئيسية", href: "#" },
    { label: "من نحن", href: "#" },
    { label: "آراء العملاء", href: "#" },
    { label: "اتصل بنا", href: "#" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col w-full items-start relative bg-black">
      <div className="relative w-full bg-black overflow-hidden">
        {/* Fixed Navigation */}
        <header 
          // initial={{ y: -100, opacity: 0 }}
          // animate={{ y: 0, opacity: 1 }}
          // transition={{ duration: 0.6 }}
          className="flex w-full items-start fixed top-0 left-0 z-50"
        >
          <nav className="flex items-center justify-center w-full py-2.5 px-10 bg-black/90 backdrop-blur-sm">
            <div className="flex max-w-[1080px] w-full items-center justify-between relative rounded">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-1">
                <div className="flex w-[48px] items-start justify-center">
                  <div className="relative w-[48px] h-[80px] bg-black rounded overflow-hidden">
                    <img
                      className="absolute w-[40px] h-[70px] top-1 left-1 object-contain"
                      alt="IMRO Logo"
                      src={logoImmro}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <div className="[font-family:'Figtree',Helvetica] font-bold text-white text-[21px] tracking-[-0.26px] leading-[25.2px]">
                  IMRO
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center justify-center gap-4 py-1">
                <NavigationMenu>
                  <NavigationMenuList className="flex items-center gap-0.5 py-0.5">
                    {navItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className="inline-flex items-center justify-center px-3.5 py-2 font-medium text-white text-sm tracking-[-0.28px] leading-[16.8px] hover:text-blue-400 transition-colors duration-300"
                          href={item.href}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Authentication Buttons */}
                {user ? (
                  <div className="flex items-center gap-3">
                    {/* Admin Link for Admin Users */}
                    {user.isAdmin && (
                      <Link to="/admin">
                        <Button 
                          className="px-3 py-2 border-gray-600 text-white hover:bg-white hover:text-gray-800 bg-gray-800 transition-colors duration-300"
                        >
                          <ShieldIcon className="w-4 h-4 mr-2" />
                          لوحة الإدارة
                        </Button>
                      </Link>
                    )}
                    
                    {/* User Info */}
                    <div className="flex items-center gap-2 text-white text-sm">
                      <UserIcon className="w-4 h-4" />
                      <span className="font-['Tajawal',sans-serif]">{user.name}</span>
                    </div>
                    
                    {/* Sign Out Button */}
                    <Button 
                      onClick={handleLogout}
                      className="px-3 py-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-colors duration-300"
                    >
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      تسجيل الخروج
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {/* Login Button */}
                    {/* <Link to="/login">
                      <Button 
                        variant="outline" 
                        className="px-3 py-2 border-gray-600 text-white hover:bg-gray-800 transition-colors duration-300"
                      >
                        تسجيل الدخول
                      </Button>
                    </Link> */}
                    
                    {/* Sign Up Button */}
                    <Link to="/signup">
                      <Button 
                        className="px-3 py-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      >
                        إنشاء حساب
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Call to Action Button */}
                <Link to="/book-call">
                  <Button className="px-[13px] py-[9px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-md shadow-lg border border-blue-500/20 transition-all duration-300 hover:shadow-blue-500/25">
                    <span className="font-medium text-white text-sm tracking-[-0.28px] leading-[16.8px]">
                      احجز مكالمة
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <Separator className="absolute w-full h-[1px] bottom-0 left-0 border-gray-800" />
          </nav>
        </header>

        {/* Main Content Sections */}
        <main className="flex flex-col w-full bg-black">
          {/* Hero Section - Black Background */}
          <div className="bg-black">
            <HeroSection />
          </div>

          {/* Services Section - Black Background */}
          <div className="bg-black">
            <ServicesSection />
          </div>

          {/* Trusted By Section - Black Background */}
          <div 
          // initial={{ opacity: 0, y: 30 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8, delay: 0.8 }}
          // viewport={{ once: true }}
          className="flex flex-col items-center justify-center mx-auto gap-6 w-full max-w-[800px]"
        >
          <h3 
            // initial={{ opacity: 0, y: 20 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.6, delay: 1.0 }}
            // viewport={{ once: true }}
            className="font-greta font-bold text-white text-2xl text-center"
          >
            أكثر من 50+ عميل يثقون بنا
          </h3>

          {/* Auto-sliding profiles container */}
          <div className="relative w-full h-40 overflow-hidden  rounded-xl  border-gray-700">
            <div
              className="flex items-center gap-6 absolute top-1/2 transform -translate-y-1/2"
              // animate={{ x: -currentSlide * 200 }}
              // transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ left: 20 }}
            >
              {[...clientProfiles, ...clientProfiles].map((profile, index) => (
                <div
                  key={index}
                  // initial={{ opacity: 0, scale: 0.8 }}
                  // whileInView={{ opacity: 1, scale: 1 }}
                  // transition={{ duration: 0.5, delay: index * 0.1 }}
                  // viewport={{ once: true }}
                  className="flex items-center gap-3 min-w-[180px] p-3 bg-gray-800/50 rounded-lg border border-gray-600"
                >
                  <div className="text-2xl">{profile.avatar}</div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium font-['Tajawal',sans-serif] text-sm">
                      {profile.name}
                    </span>
                    <span className="text-gray-400 font-['Tajawal',sans-serif] text-xs">
                      {profile.company}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          {/* Process Section - Black Background */}
          <div className="bg-black">
            <ProcessSection />
          </div>

          {/* Case Studies Section - Black Background */}
          <div className="bg-black">
            <CaseStudiesSection />
          </div>

          {/* Benefits Section - Black Background */}
          <div className="bg-black">
            <BenefitsSection />
          </div>

          {/* Pricing Section - Black Background */}
          <div className="bg-black">
            <PricingSection />
          </div>

          {/* Testimonials Section - Black Background */}
          <div className="bg-black">
            <TestimonialsSection />
          </div>

          {/* FAQs and CTA Section - Black Background */}
          <div className="bg-black">
            <FaqsAndCtaSection />
          </div>

          {/* Main Content Section - Black Background */}
          <div className="bg-black">
            <MainContentSection />
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col w-full bg-black">
          <div className="px-10 py-[25px] flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[1840px] items-center justify-between pt-0 pb-px px-0 flex">
              <div className="inline-flex flex-col items-start mt-[-1.10px] mb-[-1.10px]">
                <div className="flex flex-col items-start w-full">
                  <div className="inline-flex items-start px-0 py-[0.5px]">
                    <div className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm tracking-[-0.28px] leading-[16.8px]">
                      شعار من flaticon
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline-flex flex-col items-start mt-[-1.10px] mb-[-1.10px]">
                <div className="flex flex-col items-start w-full">
                  <div className="inline-flex items-start px-0 py-[0.5px]">
                    <div className="font-['Tajawal',sans-serif] font-normal text-sm leading-[14px]">
                      {/* <span className="font-medium text-[#cccccc] tracking-[-0.28px] leading-[16.8px]">
                        صنع بحب بواسطة 
                      </span> */}
                      <a className="font-medium text-blue tracking-[-0.28px] leading-[16.8px]">
                        {" "}
                        Developed by OrBit 
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline-flex flex-col items-start mt-[-0.60px] mb-[-0.60px]">
                <div className="flex flex-col items-start w-full">
                  <div className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-sm tracking-[-0.28px] leading-[16.8px]">
                    © جميع الحقوق محفوظة
                  </div>
                </div>
              </div>
            </div>
            <Separator className="w-full h-[2px] border-t-2 border-gray-800" />
          </div>
        </footer>
      </div>

      {/* Iframe mask overlay */}
      <img
        className="absolute w-full h-[1200px] top-0 left-0 pointer-events-none"
        alt="Iframe mask group"
        src="/iframe-mask-group.svg"
      />

      {/* "Made with" badge */}
      {/* <div className="flex w-full items-start justify-end p-5 fixed bottom-0 right-0 z-40">
        <div className="inline-flex flex-col items-start self-stretch">
          <div className="flex items-start w-full">
            <div className="relative w-[142px] h-9 bg-white rounded-[10px] overflow-hidden shadow-lg">
              <div className="inline-flex items-center gap-2.5 relative top-2.5 left-3.5">
                <div className="flex flex-col w-[11px] text-black h-4 items-center">
                  <img
                    className="w-[11px] h-4"
                    alt="Image"
                    src="/image-1.svg"
                  />
                Code PROMO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};