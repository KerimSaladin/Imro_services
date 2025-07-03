import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowLeft,
  MessageSquare,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import logoImmro from '../../assets/logoImmro.png';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      // Here you would send the contact form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      reset();
    } catch (error) {
      toast.error('فشل في إرسال الرسالة، يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-orange-900/10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-['Tajawal',sans-serif]">العودة للرئيسية</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img className="w-12 h-20" alt="IMRO Logo" src={logoImmro} />
                <span className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">IMRO</span>
              </div>
              <h1 className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">
                تواصل معنا
              </h1>
              <p className="text-gray-400 font-['Tajawal',sans-serif]">
                نحن هنا لمساعدتك، أرسل لنا رسالتك وسنرد عليك في أقرب وقت
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register('name', { 
                        required: 'الاسم مطلوب',
                        minLength: {
                          value: 2,
                          message: 'الاسم يجب أن يكون حرفين على الأقل'
                        }
                      })}
                      type="text"
                      placeholder="الاسم الكامل"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      {...register('email', { 
                        required: 'البريد الإلكتروني مطلوب',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'عنوان بريد إلكتروني غير صحيح'
                        }
                      })}
                      type="email"
                      placeholder="البريد الإلكتروني"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register('phone', { 
                        required: 'رقم الهاتف مطلوب',
                        pattern: {
                          value: /^[0-9+\-\s()]+$/,
                          message: 'رقم هاتف غير صحيح'
                        }
                      })}
                      type="tel"
                      placeholder="رقم الهاتف"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      {...register('subject', { 
                        required: 'الموضوع مطلوب',
                        minLength: {
                          value: 3,
                          message: 'الموضوع يجب أن يكون 3 أحرف على الأقل'
                        }
                      })}
                      type="text"
                      placeholder="موضوع الرسالة"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    {...register('message', { 
                      required: 'الرسالة مطلوبة',
                      minLength: {
                        value: 10,
                        message: 'الرسالة يجب أن تكون 10 أحرف على الأقل'
                      }
                    })}
                    placeholder="اكتب رسالتك هنا..."
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 rounded-md px-3 py-2 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-['Tajawal',sans-serif] py-3"
                >
                  {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <h2 className="text-xl font-bold text-white font-['Tajawal',sans-serif]">
                  معلومات التواصل
                </h2>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-['Tajawal',sans-serif] mb-1">
                      البريد الإلكتروني
                    </h3>
                    <p className="text-gray-300 font-['Tajawal',sans-serif]">
                      info@imro.com
                    </p>
                    <p className="text-gray-400 text-sm font-['Tajawal',sans-serif]">
                      للاستفسارات العامة والدعم
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-['Tajawal',sans-serif] mb-1">
                      الهاتف
                    </h3>
                    <p className="text-gray-300 font-['Tajawal',sans-serif]">
                      +213654341132
                    </p>
                    <p className="text-gray-400 text-sm font-['Tajawal',sans-serif]">
                      من الأحد إلى الخميس
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-['Tajawal',sans-serif] mb-1">
                      العنوان
                    </h3>
                    <p className="text-gray-300 font-['Tajawal',sans-serif]">
                      خدمة عبر الإنترنت
                    </p>
                    <p className="text-gray-400 text-sm font-['Tajawal',sans-serif]">
                      لا يوجد مكتب مادي حالياً
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <h2 className="text-xl font-bold text-white font-['Tajawal',sans-serif]">
                  أوقات العمل
                </h2>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-['Tajawal',sans-serif]">
                        الأحد - الخميس
                      </p>
                      <p className="text-gray-400 text-sm font-['Tajawal',sans-serif]">
                        8:00 ص - 6:00 م
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <div>
                      <p className="text-white font-['Tajawal',sans-serif]">
                        الجمعة - السبت
                      </p>
                      <p className="text-gray-400 text-sm font-['Tajawal',sans-serif]">
                        10:00 ص - 4:00 م
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-['Tajawal',sans-serif]">
                        الدعم الفني
                      </p>
                      <p className="text-gray-400 text-sm font-['Tajawal',sans-serif]">
                        24/7 متاح
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 