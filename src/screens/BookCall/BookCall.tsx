import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon, MailIcon, PhoneIcon } from 'lucide-react';
import logoImmro from '../../assets/logoImmro.png';

interface BookCallForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export const BookCall: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<BookCallForm>();

  const serviceTypes = [
    'خدمات التنظيف',
    'السباكة',
    'الخدمات الكهربائية',
    'المساعدة الطارئة (الإصلاح)',
    'الميكانيكا',
    'أخرى'
  ];

  const timeSlots = [
    '09:00 ص', '10:00 ص', '11:00 ص', '12:00 م',
    '01:00 م', '02:00 م', '03:00 م', '04:00 م', '05:00 م'
  ];

  const onSubmit = async (data: BookCallForm) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/bookings', data);
      toast.success('تم حجز مكالمتك! سنتواصل معك قريباً.');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل في حجز المكالمة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-900/90 via-black/70 to-orange-900/90 z-10 pointer-events-none"/>
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5 text-white" />
            <span className="text-white font-['Tajawal',sans-serif]">العودة للرئيسية</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <img className="w-12 h-20" alt="IMRO Logo" src={logoImmro} />
            <span className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">IMRO</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl  text-white font-greta text-gradient mb-4">
              <span className="bg-gradient-to-r font-greta from-blue-400 to-orange-400 bg-clip-text text-transparent ">
                احجز استشارة مجانية
              </span>
            </h1>
            <p className="text-xl text-gray-300 font-['Tajawal',sans-serif] max-w-2xl mx-auto">
              احصل على استشارة مجانية من خبرائنا وتقدير سعر دقيق لاحتياجاتك
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <h2 className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">
                  لماذا تختار منصتنا؟
                </h2>
                <p className="text-gray-400 font-['Tajawal',sans-serif]">
                  نقدم خدمات عالية الجودة مع ضمان الرضا التام
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          {...register('name', { required: 'الاسم مطلوب' })}
                          type="text"
                          placeholder="الاسم الكامل"
                          className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          {...register('email', { 
                            required: 'البريد الإلكتروني مطلوب',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'عنوان بريد إلكتروني غير صحيح'
                            }
                          })}
                          type="email"
                          placeholder="عنوان البريد الإلكتروني"
                          className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          {...register('phone', { required: 'رقم الهاتف مطلوب' })}
                          type="tel"
                          placeholder="رقم الهاتف"
                          className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        {...register('company')}
                        type="text"
                        placeholder="اسم الشركة (اختياري)"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <select
                        {...register('serviceType', { required: 'يرجى اختيار نوع الخدمة' })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">اختر نوع الخدمة</option>
                        {serviceTypes.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      {errors.serviceType && (
                        <p className="text-red-400 text-sm mt-1">{errors.serviceType.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          {...register('preferredDate', { required: 'يرجى اختيار التاريخ المفضل' })}
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="pl-10 bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                        />
                      </div>
                      {errors.preferredDate && (
                        <p className="text-red-400 text-sm mt-1">{errors.preferredDate.message}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <ClockIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                          {...register('preferredTime', { required: 'يرجى اختيار الوقت المفضل' })}
                          className="w-full pl-10 px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">اختر الوقت</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      {errors.preferredTime && (
                        <p className="text-red-400 text-sm mt-1">{errors.preferredTime.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="أخبرنا عن مشروعك وما تريد مناقشته..."
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-md focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-600 text-white font-['Tajawal',sans-serif] py-3 text-lg"
                  >
                    {loading ? 'جاري حجز مكالمتك...' : (
                      <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent font-bold">
                        احجز استشارة مجانية
                      </span>
                    )}
                  </Button>
                </form>

                <div className="mt-8 p-6 bg-gray-800/50 rounded-lg">
                  <h3 className="text-lg font-bold text-white font-greta mb-3">
                    ما يمكن توقعه:
                  </h3>
                  <ul className="space-y-2 text-gray-300 font-['Tajawal',sans-serif]">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      مكالمة استشارة لمدة 30 دقيقة
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      استراتيجية أتمتة ذكاء اصطناعي مخصصة
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      عرض بدون التزام
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      خارطة طريق التنفيذ
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
