import React, { type JSX } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Clock, 
  DollarSign, 
  Headphones, 
  Lock, 
  MapPin
} from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

export const BenefitsSection = (): JSX.Element => {
  // Define benefit cards data with React Icons
  const benefitCards = [
    {
      icon: Shield,
      title: "خبراء معتمدون",
      description: "جميع المقدمين يتم التحقق من جودتهم واحترافيتهم.",
      color: "text-blue-400",
      bgColor: "bg-blue-600/20",
      borderColor: "border-blue-600/30",
    },
    {
      icon: Clock,
      title: "حجز سريع",
      description: "تواصل واحجز الخدمات في دقائق.",
      color: "text-green-400",
      bgColor: "bg-green-600/20",
      borderColor: "border-green-600/30",
    },
    {
      icon: DollarSign,
      title: "أسعار عادلة",
      description: "لا مفاجآت — أسعارنا عادلة وثابتة وشفافة تماماً.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-600/20",
      borderColor: "border-yellow-600/30",
    },
    {
      icon: Headphones,
      title: "دعم 24/7",
      description: "نحن هنا للمساعدة، في أي وقت — مخصص لموقعك.",
      color: "text-purple-400",
      bgColor: "bg-purple-600/20",
      borderColor: "border-purple-600/30",
    },
    {
      icon: Lock,
      title: "آمن وخاص",
      description: "بياناتك تبقى خاصة — جميع المعاملات مشفرة وآمنة.",
      color: "text-red-400",
      bgColor: "bg-red-600/20",
      borderColor: "border-red-600/30",
    },
    {
      icon: MapPin,
      title: "مطابقة حسب الموقع",
      description: "اعثر على محترفين قريبين لخدمة أسرع وتكاليف أقل.",
      color: "text-orange-400",
      bgColor: "bg-orange-600/20",
      borderColor: "border-orange-600/30",
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
          className="relative z-[1]"
        >
          <Badge className="bg-loving-help-337691framerappcod-gray-80 text-white font-medium text-sm tracking-[-0.28px] leading-[16.8px] relative">
            المزايا
            <div className="w-[77px] h-[33px] top-0 left-0 rounded-md border-[#222222] absolute border border-solid" />
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
              className="text-[50px] font-normal font-greta text-white tracking-[-2.00px] leading-[55px] text-center font-greta"
            >
              لماذا يثق آلاف الأشخاص
              <br />
              <span className="gradient-text font-greta">بمنصتنا</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col max-w-[600px] w-full items-center"
          >
            <p className="text-[#cccccc] font-medium text-lg text-center tracking-[-0.36px] leading-[27px] font-['Tajawal',sans-serif]">
              نجعل من السهل العثور على محترفين يمكنك الاعتماد عليهم — لكل
              حاجة،
              <br />
              في كل مرة.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1200px] w-full"
      >
        {benefitCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={`benefit-card-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.0 + index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <Card className="relative h-[190px] rounded-lg overflow-hidden border-[#222222] bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm hover:from-gray-800/90 hover:to-gray-700/50 transition-all duration-300 group">
                <CardContent className="p-6 h-full flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.15 }}
                    viewport={{ once: true }}
                    className={`inline-flex p-3 rounded-lg ${card.bgColor} ${card.borderColor} border mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-6 h-6 ${card.color}`} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.15 }}
                    viewport={{ once: true }}
                    className="flex-1"
                  >
                    <h3 className="text-white text-[23px] font-bold tracking-[-0.46px] leading-[27.6px] font-greta mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[#cccccc] text-[16px] font-medium tracking-[-0.32px] leading-[22.4px] font-['Tajawal',sans-serif]">
                      {card.description}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
