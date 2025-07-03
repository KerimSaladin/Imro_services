import { ArrowRightIcon } from "lucide-react";
import React, { useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FaqsAndCtaSection = (): JSX.Element => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // FAQ data for mapping
  const faqItems = [
    {
      id: "item-1",
      question: "كيف أحجز خدمة؟",
      answer:
        "يمكنك حجز الخدمة من خلال منصتنا باختيار الخدمة المطلوبة، واختيار مقدم الخدمة، وتحديد الوقت المناسب. عملية الحجز بسيطة وتستغرق دقائق قليلة فقط.",
    },
    {
      id: "item-2",
      question: "هل مقدمي الخدمات موثقون؟",
      answer:
        "نعم، جميع مقدمي الخدمات في منصتنا يخضعون لعملية تحقق شاملة. نتحقق من مؤهلاتهم وخبراتهم وخلفيتهم لضمان حصولك على خدمة عالية الجودة.",
    },
    {
      id: "item-3",
      question: "ماذا يحدث إذا لم أكن راضياً عن الخدمة؟",
      answer:
        "لدينا سياسة ضمان الرضا. إذا لم تكن راضياً عن الخدمة، يمكنك الإبلاغ عن المشكلة خلال 24 ساعة، وسنعمل على حلها. قد يشمل ذلك استرداد جزئي أو كامل أو جدولة موعد خدمة جديد.",
    },
    {
      id: "item-4",
      question: "هل يمكنني جدولة الخدمات مسبقاً؟",
      answer:
        "نعم، يمكنك جدولة الخدمات قبل أيام أو أسابيع أو حتى أشهر. تتيح لك منصتنا حجز المواعيد حسب راحتك وتوفر مقدم الخدمة.",
    },
    {
      id: "item-5",
      question: "ما هي طرق الدفع المتاحة؟",
      answer:
        "نحن نقبل جميع طرق الدفع الرئيسية بما في ذلك البطاقات الائتمانية والمدى والتحويل البنكي. جميع المعاملات آمنة ومشفرة لحماية معلوماتك.",
    },
    {
      id: "item-6",
      question: "هل الخدمات متاحة في جميع المناطق؟",
      answer:
        "نحن نعمل في معظم المدن الرئيسية ونوسع خدماتنا باستمرار. يمكنك التحقق من توفر الخدمة في منطقتك من خلال إدخال عنوانك.",
    },
  ];

  const toggleItem = (itemId: string) => {
    console.log('Toggling item:', itemId); // Debug log
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
    console.log('New open items:', Array.from(newOpenItems)); // Debug log
  };

  return (
    <section className="w-full py-24 relative">
      <div className="flex flex-col w-full items-center justify-center gap-6">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-6 mb-8"
        >
          <Badge className="bg-loving-help-337691framerappcod-gray-80 text-white font-medium rounded-md px-3 py-2 relative">
            <span className="relative z-10 font-['Tajawal',sans-serif]">الأسئلة الشائعة</span>
            <div className="w-full h-full rounded-md border border-solid border-[#222222] absolute top-0 left-0" />
          </Badge>

          <div className="flex flex-col max-w-[700px] items-center text-center">
            <h2 className="font-greta font-normal text-white text-[50px] tracking-[-2.00px] leading-[55px] text-center">
              لدينا
              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent font-greta">
                الإجابات
              </span>
              <br />
              التي تبحث عنها
            </h2>
          </div>

          <div className="max-w-[600px] text-center">
            <p className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-lg tracking-[-0.36px] leading-[27px]">
              إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا ومنصتنا.
            </p>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-[800px] relative"
        >
          <div className="absolute w-full h-[328px] top-[-19px] left-0 overflow-hidden blur-[25px] opacity-30">
            <div className="flex flex-col w-full h-[358px] items-start justify-center relative top-[-15px] opacity-50">
              <div className="relative flex-1 self-stretch w-full grow bg-[url(/svg12160520360.svg)] bg-[100%_100%]" />
            </div>
          </div>

          <div className="w-full space-y-3 relative z-10">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-loving-help-337691framerappwhite-5 rounded-md border border-solid border-[#222222] overflow-hidden hover:border-gray-600 transition-colors duration-300">
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-5 py-[17px] font-['Tajawal',sans-serif] text-black hover:no-underline hover:text-blue-400 transition-colors duration-300 text-right cursor-pointer flex items-center justify-between bg-transparent border-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    style={{ userSelect: 'none' }}
                  >
                    <span className="flex-1 text-right pr-2">{item.question}</span>
                    <div className="flex-shrink-0">
                      {openItems.has(item.id) ? (
                        <ChevronUp className="w-4 h-4 text-blue-400 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.has(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-4 overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent font-['Tajawal',sans-serif] text-base leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-[750px] w-full mt-12 rounded-xl overflow-hidden bg-[linear-gradient(164deg,rgba(12,29,220,1)_0%,rgba(13,13,13,0.8)_20%,rgba(13,13,13,0.8)_29%,rgba(13,13,13,0.8)_81%,rgba(13,14,38,0.81)_81%,rgba(13,14,38,0.81)_81%,rgba(12,29,220,1)_100%)]">
            <CardContent className="flex flex-col items-center justify-center gap-[15px] px-[30px] py-20">
              <div className="max-w-[700px] w-full text-center">
                <h3 className="bg-[linear-gradient(0deg,rgba(253,99,1,1)_0%,rgba(12,29,220,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-greta font-bold text-transparent text-[50px] tracking-[-2.00px] leading-[55px]">
                  جاهز للبدء؟ احصل على استشارة مجانية وتقدير سعر دقيق لاحتياجاتك.
                </h3>
              </div>

              <div className="max-w-[500px] w-full text-center">
                <p className="font-['Tajawal',sans-serif] font-medium text-[#cccccc] text-lg tracking-[-0.36px] leading-[27px]">
                  انضم إلى آلاف المستخدمين الراضين. سريع، آمن، وخالي من التوتر.
                </p>
              </div>

              <Link to="/book-call">
                <Button className="mt-2 bg-loving-help-337691framerappdark-blue text-white font-medium text-[15px] tracking-[-0.60px] rounded-md border border-solid border-[#ffffff1a] shadow-[0px_30px_30px_-3.75px_#0000000d,0px_13.65px_13.65px_-3.12px_#0000001a,0px_6.87px_6.87px_-2.5px_#00000021,0px_3.62px_3.62px_-1.88px_#00000024,0px_1.81px_1.81px_-1.25px_#00000024,0px_0.71px_0.71px_-0.62px_#00000026] hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                  <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent font-bold">
                    احجز مكالمة مجانية
                  </span>
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
