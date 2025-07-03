import React, { useState, type JSX } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Home, 
  Crown, 
  Building2, 
  Check,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
  Award,
  Headphones,
  BarChart3,
  Percent,
  Settings
} from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/card";
import { Switch } from "../../../../components/ui/switch";

export const PricingSection = (): JSX.Element => {
  const [isYearly, setIsYearly] = useState(false);

  // Pricing plans data for service platform
  const pricingPlans = [
    {
      icon: Home,
      title: "الخطة الأساسية",
      monthlyPrice: "مجاني",
      yearlyPrice: "مجاني",
      description: "مثالية للاستخدام الشخصي والاحتياجات الأساسية.",
      buttonText: "ابدأ مجاناً",
      buttonVariant: "outline",
      buttonLink: "/signup",
      features: [
        { text: "حجز خدمات أساسية", icon: Check },
        { text: "دعم العملاء الأساسي", icon: Headphones },
        { text: "تقييمات ومراجعات", icon: Star },
        { text: "إشعارات الحجز", icon: Clock },
        { text: "حتى 3 حجوزات شهرياً", icon: Users },
      ],
      background: "radial-gradient(50% 50% at 50% 100%, rgba(12,29,220,0.3) 0%, rgba(12,29,220,0) 100%)",
      badge: null,
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-600/30",
    },
    {
      icon: Crown,
      title: "الخطة المميزة",
      monthlyPrice: "290 دينار",
      yearlyPrice: "2900 دينار",
      description: "مثالية للعائلات والاستخدام المتكرر للخدمات.",
      buttonText: "اشترك الآن",
      buttonVariant: "default",
      buttonLink: "/payment",
      features: [
        { text: "جميع الخدمات المتاحة", icon: Zap },
        { text: "أولوية في الحجز", icon: Award },
        { text: "دعم العملاء المميز", icon: Headphones },
        { text: "تأمين الخدمات", icon: Shield },
        { text: "حجوزات غير محدودة", icon: Users },
      ],
      background: "radial-gradient(50% 50% at 52% 0%, rgba(12,29,220,0.45) 0%, rgba(12,29,220,0) 100%)",
      badge: "الأكثر شعبية",
      color: "text-yellow-400",
      bgColor: "bg-yellow-600/20",
      borderColor: "border-yellow-600/30",
    },
    {
      icon: Building2,
      title: "خطة الأعمال",
      monthlyPrice: "990 دينار",
      yearlyPrice: "9900 دينار",
      description: "مثالية للشركات والمؤسسات التي تحتاج خدمات منتظمة.",
      buttonText: "تواصل معنا",
      buttonVariant: "outline",
      buttonLink: "/contact",
      features: [
        { text: "إدارة حسابات متعددة", icon: Users },
        { text: "تقارير مفصلة", icon: BarChart3 },
        { text: "دعم مخصص 24/7", icon: Headphones },
        { text: "خصومات خاصة", icon: Percent },
        { text: "خدمات مخصصة", icon: Settings },
      ],
      background: "radial-gradient(50% 50% at 50% 100%, rgba(12,29,220,0.3) 0%, rgba(12,29,220,0) 100%)",
      badge: null,
      color: "text-purple-400",
      bgColor: "bg-purple-600/20",
      borderColor: "border-purple-600/30",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-[60px] py-[100px] px-10 w-full">
      <div className="flex flex-col items-center justify-center gap-[25px] max-w-[1840px] w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex flex-col items-start relative"
        >
          <Badge
            className="bg-loving-help-337691framerappcod-gray-80 text-white border-[#222222] font-medium text-sm tracking-[-0.28px]"
          >
            الأسعار
          </Badge>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-[15px] w-full"
        >
          <div className="flex flex-col items-center max-w-[700px] w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[50px] text-white text-center tracking-[-2.00px] leading-[55px] font-normal font-greta"
            >
              خطط مناسبة
              <br />
              <span className="gradient-text font-greta">لجميع الاحتياجات</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center max-w-[600px] w-full"
          >
            <p className="text-[#cccccc] text-lg text-center tracking-[-0.36px] leading-[27px] font-medium font-['Tajawal',sans-serif]">
              اختر الخطة التي تناسب احتياجاتك واستمتع بخدمات عالية الجودة
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col items-center justify-center gap-[30px] w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2.5 max-w-[1840px] w-full"
          >
            <span className={`font-['Tajawal',sans-serif] font-medium text-[16px] tracking-[-0.32px] leading-[22.4px] whitespace-nowrap transition-colors duration-300 ${
              !isYearly ? 'text-white' : 'text-[#cccccc]'
            }`}> 
              شهرياً
            </span>

            <div className="relative">
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="bg-loving-help-337691framerappdark-blue border-[#222222] data-[state=checked]:bg-loving-help-337691framerappdark-blue"
              />
            </div>

            <span className={`font-['Tajawal',sans-serif] font-medium text-[16px] tracking-[-0.32px] leading-[22.4px] whitespace-nowrap transition-colors duration-300 ${
              isYearly ? 'text-white' : 'text-[#cccccc]'
            }`}>
              سنوياً
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
            className="flex items-stretch justify-center gap-5 max-w-[1200px] w-full"
          >
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <motion.div
                  key={`plan-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.4 + index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="flex-1"
                >
                  <Card className="flex flex-col h-full w-[386.66px] gap-[35px] px-[30px] py-5 rounded-lg border-[#222222] overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm hover:from-gray-800/90 hover:to-gray-700/50 transition-all duration-300">
                    <CardHeader className="p-0 space-y-[15px]">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.6 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-[5px] w-full"
                      >
                        <div className={`inline-flex p-3 rounded-lg ${plan.bgColor} ${plan.borderColor} border`}>
                          <IconComponent className={`w-6 h-6 ${plan.color}`} />
                        </div>

                        <div className="flex-1">
                          <span className="font-['Tajawal',sans-serif] font-bold text-[#cccccc] text-[23px] tracking-[-0.46px] leading-[27.6px]">
                            {plan.title}
                          </span>
                        </div>

                        {plan.badge && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.8 + index * 0.2 }}
                            viewport={{ once: true }}
                          >
                            <Badge
                              className="bg-loving-help-337691framerappcod-gray-80 text-white border-[#222222] font-medium text-sm tracking-[-0.28px]"
                            >
                              {plan.badge}
                            </Badge>
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-end"
                      >
                        <span className="text-white text-[35px] tracking-[-1.40px] leading-[38.5px] font-medium font-['Tajawal',sans-serif]">
                          {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        {plan.monthlyPrice !== "مجاني" && (
                          <span className="ml-1 text-[#cccccc] font-['Tajawal',sans-serif] font-medium text-[16px] tracking-[-0.64px] leading-[17.6px]">
                            /{isYearly ? 'سنة' : 'شهر'}
                          </span>
                        )}
                      </motion.div>

                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.0 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="text-[#cccccc] font-['Tajawal',sans-serif] font-medium text-[16px] tracking-[-0.32px] leading-[22.4px]"
                      >
                        {plan.description}
                      </motion.p>
                    </CardHeader>

                    <CardContent className="p-0 flex-grow">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.2 + index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <Link to={plan.buttonLink}>
                          <Button
                            className={`w-full h-9 text-black text-[15px] tracking-[-0.60px] leading-[18px] font-medium font-['Tajawal',sans-serif] ${
                              plan.buttonVariant === "default"
                                ? "bg-loving-help-337691framerappdark-blue border-[#ffffff1a]"
                                : "bg-loving-help-337691framerappwhite-5 border-[#ffffff1a]"
                            }`}
                          >
                            {plan.buttonText}
                          </Button>
                        </Link>
                      </motion.div>
                    </CardContent>

                    <CardFooter className="flex flex-col items-start p-0 space-y-8">
                      <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.4 + index * 0.2 }}
                        viewport={{ once: true }}
                        className="text-[#cccccc] font-['Tajawal',sans-serif] font-medium text-[16px] tracking-[-0.32px] leading-[22.4px]"
                      >
                        ما هو مدرج:
                      </motion.span>

                      <div className="flex flex-col space-y-[32px] w-full">
                        {plan.features.map((feature, featureIndex) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <motion.div
                              key={`feature-${featureIndex}`}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 2.6 + index * 0.2 + featureIndex * 0.1 
                              }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2.5"
                            >
                              <div className="w-5 h-5 relative">
                                <FeatureIcon className="w-4 h-4 text-green-400" />
                              </div>
                              <span className="text-white font-['Tajawal',sans-serif] font-medium text-[16px] tracking-[-0.32px] leading-[22.4px]">
                                {feature.text}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
