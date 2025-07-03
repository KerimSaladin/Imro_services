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

interface LoginForm {
  email: string;
  password: string;
  isEmployee: boolean;
}

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  //const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, /*watch*/ } = useForm<LoginForm>({
    defaultValues: { isEmployee: false }
  });
  //const isEmployee = watch('isEmployee');

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      if (data.isEmployee) {
        // Employee login: fetch all employees and check credentials
        const res = await axios.post('https://goimro.onrender.com/EmployeeLogin', {
          email: data.email,
          password: data.password
        });
        //const found = res.data.find((emp: any) => emp.email === data.email && emp.password === data.password);
        
          // Store employee data in localStorage for session management
          localStorage.setItem('workerData', JSON.stringify({
            id: res.data._id || res.data.id,
            name: res.data.fullname,
            email: res.data.email,
            number: res.data.number,
            service: res.data.service,
            isEmployee: true
          }));
          toast.success('تم تسجيل دخول الموظف بنجاح!');
          navigate('/worker-panel');
      } else {
        // User login: send login request to backend
        try {
          const res = await axios.post('https://goimro.onrender.com/UserLogin', {
            email: data.email,
            password: data.password
          });
          
          // Store user data in localStorage for session management
          localStorage.setItem('userData', JSON.stringify({
            id: res.data._id || res.data.id,
            name: res.data.fullname || res.data.name,
            email: res.data.email,
            number: res.data.number,
            isEmployee: false
          }));
          toast.success('تم تسجيل الدخول بنجاح!');
          navigate('/user-panel');
        } catch (error: any) {
          if (error.response?.status === 401) {
            toast.error('بيانات المستخدم غير صحيحة');
          } else {
            toast.error('فشل تسجيل الدخول');
          }
        }
      }
    } catch (error: any) {
      toast.error('فشل تسجيل الدخول');
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
              مرحباً بعودتك
            </h1>
            <p className="text-gray-400 font-['Tajawal',sans-serif]">
              سجل دخولك إلى حسابك
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
                <label htmlFor="isEmployee" className="text-white font-medium">تسجيل الدخول كعامل/موظف</label>
              </div>
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full text-black bg-blue-600 hover:bg-blue-700 text-white font-['Tajawal',sans-serif] py-3"
              >
                
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 font-['Tajawal',sans-serif]">
                ليس لديك حساب؟{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  إنشاء حساب
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