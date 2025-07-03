import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { 
  CreditCard, 
  Calendar, 
  Lock, 
  ArrowLeft,
  CheckCircle,
  Shield,
  Clock
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import logoImmro from '../../assets/logoImmro.png';

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

// Stripe configuration from environment variables
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51Rf9NHRlTQh5JEQlLkbBRTbXVInvMcnxb7zFPT9gq9ao721ZDQYfUwoHD6GenBAvGW9gnOgOV7bJVbktsCrCQvUn00qD4GFmL2';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const Payment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plan = searchParams.get('plan') || 'premium';
  const period = searchParams.get('period') || 'monthly';
  
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentForm>();

  // Pricing data
  const pricingData = {
    basic: { monthly: 0, yearly: 0, name: 'الخطة الأساسية' },
    premium: { monthly: 29, yearly: 290, name: 'الخطة المميزة' },
    business: { monthly: 99, yearly: 990, name: 'خطة الأعمال' }
  };

  const currentPlan = pricingData[plan as keyof typeof pricingData];
  const amount = period === 'yearly' ? currentPlan.yearly : currentPlan.monthly;

  const onSubmit = async (data: PaymentForm) => {
    setLoading(true);
    try {
      // Create payment intent with Stripe
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents for Stripe
          currency: 'dzd',
          plan: plan,
          period: period,
          customerData: {
            name: data.cardholderName,
            email: 'customer@example.com', // You might want to get this from user context
          }
        }),
      });

      if (!response.ok) {
        //throw new Error('فشل في إنشاء عملية الدفع');
      }

      const paymentIntent = await response.json();

      // Here you would integrate with Stripe Elements or Stripe.js
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('تم الدفع بنجاح!');
      navigate('/');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('فشل في عملية الدفع، يرجى المحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [] as string[];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-orange-900/10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-['Tajawal',sans-serif]">العودة للرئيسية</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img className="w-12 h-20" alt="IMRO Logo" src={logoImmro} />
                <span className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">IMRO</span>
              </div>
              <h1 className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">
                إتمام الدفع
              </h1>
              <p className="text-gray-400 font-['Tajawal',sans-serif]">
                أدخل بيانات البطاقة لإتمام الاشتراك
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-['Tajawal',sans-serif]">
                    رقم البطاقة
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...register('cardNumber', { 
                        required: 'رقم البطاقة مطلوب',
                        pattern: {
                          value: /^[\d\s]{16,19}$/,
                          message: 'رقم بطاقة غير صحيح'
                        }
                      })}
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      onChange={(e) => {
                        e.target.value = formatCardNumber(e.target.value);
                      }}
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.cardNumber.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Tajawal',sans-serif]">
                      تاريخ الانتهاء
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...register('expiryDate', { 
                          required: 'تاريخ الانتهاء مطلوب',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: 'صيغة غير صحيحة (MM/YY)'
                          }
                        })}
                        type="text"
                        placeholder="MM/YY"
                        className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>
                    {errors.expiryDate && (
                      <p className="text-red-400 text-sm mt-1">{errors.expiryDate.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Tajawal',sans-serif]">
                      رمز الأمان
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...register('cvv', { 
                          required: 'رمز الأمان مطلوب',
                          pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: 'رمز أمان غير صحيح'
                          }
                        })}
                        type="text"
                        placeholder="123"
                        className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>
                    {errors.cvv && (
                      <p className="text-red-400 text-sm mt-1">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-['Tajawal',sans-serif]">
                    اسم حامل البطاقة
                  </label>
                  <Input
                    {...register('cardholderName', { 
                      required: 'اسم حامل البطاقة مطلوب',
                      minLength: {
                        value: 2,
                        message: 'الاسم يجب أن يكون حرفين على الأقل'
                      }
                    })}
                    type="text"
                    placeholder="الاسم كما يظهر على البطاقة"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                  {errors.cardholderName && (
                    <p className="text-red-400 text-sm mt-1">{errors.cardholderName.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-['Tajawal',sans-serif] py-3"
                >
                  {loading ? 'جاري معالجة الدفع...' : `ادفع 290 دينار`}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm h-fit">
            <CardHeader>
              <h2 className="text-xl font-bold text-white font-['Tajawal',sans-serif]">
                ملخص الطلب
              </h2>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-['Tajawal',sans-serif]">الخطة:</span>
                <span className="text-white font-bold font-['Tajawal',sans-serif]">{currentPlan.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-['Tajawal',sans-serif]">المدة:</span>
                <span className="text-white font-bold font-['Tajawal',sans-serif]">
                  {period === 'yearly' ? 'سنة واحدة' : 'شهر واحد'}
                </span>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white font-['Tajawal',sans-serif]">المجموع:</span>
                  <span className="text-2xl font-bold text-blue-400 font-['Tajawal',sans-serif]">
                    290 دينار
                  </span>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300 font-['Tajawal',sans-serif]">
                    دفع آمن ومشفر
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300 font-['Tajawal',sans-serif]">
                    ضمان استرداد الأموال
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300 font-['Tajawal',sans-serif]">
                    تفعيل فوري
                  </span>
                </div>
              </div>

              {/* Stripe Info */}
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-4 bg-white rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">STRIPE</span>
                  </div>
                  <span className="text-xs text-gray-400 font-['Tajawal',sans-serif]">
                    مدفوعات آمنة
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}; 