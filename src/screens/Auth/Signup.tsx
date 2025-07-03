import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import logoImmro from '../../assets/logoImmro.png';
import axios from 'axios';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isEmployee: boolean;
  number: string;
  goldcard: string;
  service: string;
}

const serviceOptions = [
  'خدمات التنظيف',
  'السباكة',
  'الخدمات الكهربائية',
  'المساعدة الطارئة (الإصلاح)',
  'الميكانيكا',
  'أخرى'
];

export const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>({
    defaultValues: { isEmployee: false }
  });

  const password = watch('password');
  const isEmployee = watch('isEmployee');

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    try {
      if (data.isEmployee) {
        // Employee registration
        const res = await axios.post('https://goimro.onrender.com/CreateEmployee', {
          fullname: data.name,
          number: data.number,
          email: data.email,
          password: data.password,
          goldcard: data.goldcard,
          service: data.service
        });
        
        // Store employee data in localStorage for session management
        localStorage.setItem('userData', JSON.stringify({
          id: res.data._id || res.data.id,
          name: res.data.fullname || res.data.name,
          email: res.data.email,
          number: res.data.number,
          service: res.data.service,
          isEmployee: true
        }));
        
        toast.success('تم إنشاء حساب الموظف بنجاح!');
        navigate('/worker-panel');
      } else {
        // User registration
        const res = await axios.post('https://goimro.onrender.com/CreateUser', {
          fullname: data.name,
          number: data.number,
          email: data.email,
          password: data.password,
          goldcard: data.goldcard
        });
        
        // Store user data in localStorage for session management
        localStorage.setItem('userData', JSON.stringify({
          id: res.data._id || res.data.id,
          name: res.data.fullname || res.data.name,
          email: res.data.email,
          number: res.data.number,
          isEmployee: false
        }));
        
        toast.success('تم إنشاء الحساب بنجاح!');
        navigate('/user-panel');    
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'فشل إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-900/90 via-black/70 to-orange-900/90 z-10 pointer-events-none"/>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img className="w-12 h-20" alt="IMRO Logo" src={logoImmro} />
              <span className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">IMRO</span>
            </div>
            <h1 className="text-3xl font-bold text-white font-['Tajawal',sans-serif]">
              إنشاء حساب جديد
            </h1>
            <p className="text-gray-400 font-['Tajawal',sans-serif]">
              املأ البيانات التالية لإنشاء حسابك
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Employee Checkbox */}
              <div className="flex items-center justify-center mb-6 p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="isEmployee" 
                    {...register('isEmployee')} 
                    className="text-blue-600"
                  />
                  <label htmlFor="isEmployee" className="text-white font-medium">تسجيل كعامل/موظف</label>
                </div>
              </div>

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
                  placeholder="عنوان البريد الإلكتروني"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {isEmployee && (
                <>
                  <div>
                    <Input
                      {...register('number', { required: 'رقم الهاتف مطلوب' })}
                      type="text"
                      placeholder="رقم الهاتف"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    {errors.number && (
                      <p className="text-red-400 text-sm mt-1">{errors.number.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('goldcard')}
                      type="text"
                      placeholder="رقم البطاقة الذهبية (اختياري)"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <select
                      {...register('service', { required: 'يرجى اختيار نوع الخدمة' })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">اختر نوع الخدمة</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-sm mt-1">{errors.service.message}</p>
                    )}
                  </div>
                </>
              )}
              {!isEmployee && (
                <>
                  <div>
                    <Input
                      {...register('number', { required: 'رقم الهاتف مطلوب' })}
                      type="tel"
                      placeholder="رقم الهاتف"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    {errors.number && (
                      <p className="text-red-400 text-sm mt-1">{errors.number.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('goldcard')}
                      type="text"
                      placeholder="رقم البطاقة الذهبية (اختياري)"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <div>
                <Input
                  {...register('password', { 
                    required: 'كلمة المرور مطلوبة',
                    minLength: {
                      value: 6,
                      message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
                    }
                  })}
                  type="password"
                  placeholder="كلمة المرور"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <Input
                  {...register('confirmPassword', { 
                    required: 'يرجى تأكيد كلمة المرور',
                    validate: value => value === password || 'كلمات المرور غير متطابقة'
                  })}
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-black font-['Tajawal',sans-serif] py-3"
              >
                {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 font-['Tajawal',sans-serif]">
                لديك حساب بالفعل؟{' '}
                <Link 
                  to="/login" 
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-white text-sm font-['Tajawal',sans-serif]"
              >
                ← العودة للرئيسية
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};