import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  CheckIcon, 
  XIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  MailIcon, 
  PhoneIcon,
  BuildingIcon,
  MessageSquareIcon,
  LogOutIcon
} from 'lucide-react';
import logoImmro from '../../assets/logoImmro.png';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'pending' | 'authorized' | 'confirmed' | 'rejected';
  createdAt: string;
  employeeName?: string;
  employeeEmail?: string;
  employeePhone?: string;
}

export const AdminPanel: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');
  const { user, logout } = useAuth();

  // Mock booking for demonstration
  const mockBookings: Booking[] = [
    {
      _id: '1',
      name: 'Saad Kerim',
      email: 'OrBit@startup.dz',
      phone: '0667863502',
      company: 'OrBit Technologies',
      serviceType: 'Consultation',
      preferredDate: '2025-07-01',
      preferredTime: '10:00 AM',
      message: 'We are a technology company looking for consulting services.',
      status: 'pending',
      createdAt: '2025-06-30T10:00:00Z'
    },
    {
      _id: '2',
      name: 'Nacer Eddine Ghellale',
      email: 'foogic@startup.dz',
      phone: '0794041082',
      company: 'Foogic Solutions',
      serviceType: 'Cleaning',
      preferredDate: '2025-07-01',
      preferredTime: '10:00 AM',
      message: 'We are a technology company looking for cleaning services.',
      status: 'confirmed',
      createdAt: '2025-06-30T10:00:00Z'
    }
  ];

  // Fetch all bookings from backend
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get('https://goimro.onrender.com/GetBookService');
        
        // Fetch user and employee data for each booking
        const allBookings: Booking[] = await Promise.all(
          response.data.map(async (booking: any) => {
            let userName = 'Unknown User';
            let userEmail = 'unknown@email.com';
            let userPhone = 'Unknown';
            let userCompany = 'Unknown';
            let employeeName = 'Unknown Employee';
            let employeeEmail = 'unknown@email.com';
            let employeePhone = 'Unknown';
            let employeeService = 'Unknown Service';

            try {
              // Fetch user details by ID
              if (booking.userid) {
                const userResponse = await axios.get('https://goimro.onrender.com/GetUser');
                const user = userResponse.data.find((u: any) => u.id === booking.userid);
                if (user) {
                  userName = user.fullname;
                  userEmail = user.email;
                  userPhone = user.number;
                  userCompany = booking.location || 'N/A';
                }
              }

              // Fetch employee details by ID
              if (booking.employeeId) {
                const employeeResponse = await axios.get('https://goimro.onrender.com/GetEmployee');
                const employee = employeeResponse.data.find((e: any) => e.id === booking.employeeId);
                if (employee) {
                  employeeName = employee.fullname;
                  employeeEmail = employee.email;
                  employeePhone = employee.number;
                  employeeService = employee.service;
                }
              }
            } catch (error) {
              console.error('Error fetching user/employee details:', error);
            }

            return {
              _id: booking.id || booking._id,
              name: userName,
              email: userEmail,
              phone: userPhone,
              company: userCompany,
              serviceType: employeeService,
              preferredDate: booking.date || "غير محدد",
              preferredTime: booking.time || "غير محدد",
              message: booking.location || "",
              status: booking.isaothorized === "true"
                ? "authorized"
                : booking.isaothorized === "false"
                ? "rejected"
                : "pending",
              suggestedPrice: booking.price ? Number(booking.price) : undefined,
              userResponse: booking.userResponse || undefined,
              createdAt: booking.createdAt || new Date().toISOString(),
              employeeName: employeeName,
              employeeEmail: employeeEmail,
              employeePhone: employeePhone
            };
          })
        );
        
        setBookings(allBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('فشل في جلب الحجوزات');
        setBookings(mockBookings); // fallback
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllBookings();
  }, []);

  const authorizeBooking = async (bookingId: string) => {
    try {
      await axios.post('https://goimro.onrender.com/AutoriseBookService', {
        bookingId: bookingId,
        isaothorized: "true"
      });
      
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: 'authorized' } : booking
      ));
      toast.success('تم تفويض الحجز بنجاح!');
    } catch (error) {
      toast.error('فشل في تفويض الحجز');
    }
  };

  const rejectBooking = async (bookingId: string) => {
    try {
      await axios.post('https://goimro.onrender.com/AutoriseBookService', {
        bookingId: bookingId,
        isAuthorized: "false"
      });
      
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? { ...booking, status: 'rejected' } : booking
      ));
      toast.success('تم رفض الحجز بنجاح!');
    } catch (error) {
      toast.error('فشل في رفض الحجز');
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'authorized': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'authorized': return 'مفوض';
      case 'confirmed': return 'مؤكد';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-900/90 via-black/70 to-orange-900/90 z-10 pointer-events-none"/>
      
      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img className="w-12 h-20" alt="IMRO Logo" src={logoImmro} />
              <span className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">IMRO</span>
            </div>
            <Badge className="bg-blue-600 text-white">لوحة الإدارة</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white font-['Tajawal',sans-serif]">مرحباً، {user?.name}</span>
            <Button
              onClick={logout}
              className="border-gray-600 bg-gray-800 text-black hover:bg-white"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white font-['Tajawal',sans-serif] mb-2">
              إدارة الحجوزات
            </h1>
            <p className="text-gray-400 font-['Tajawal',sans-serif]">
              إدارة والرد على طلبات حجز العملاء
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { label: 'إجمالي الحجوزات', value: bookings.length, color: 'blue' },
              { label: 'في الانتظار', value: bookings.filter(b => b.status === 'pending').length, color: 'yellow' },
              { label: 'مؤكد', value: bookings.filter(b => b.status === 'confirmed').length, color: 'green' },
              { label: 'مرفوض', value: bookings.filter(b => b.status === 'rejected').length, color: 'red' },
            ].map((stat, index) => (
              <Card key={index} className="bg-gray-900/80 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-white font-['Tajawal',sans-serif]">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-['Tajawal',sans-serif]">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'الكل' },
                { value: 'pending', label: 'في الانتظار' },
                { value: 'confirmed', label: 'مؤكد' },
                { value: 'rejected', label: 'مرفوض' }
              ].map((status) => (
                <Button
                  key={status.value}
                  onClick={() => setFilter(status.value as any)}
                  className={
                    filter === status.value
                      ? 'bg-blue-600 text-black'
                      : 'border-gray-600 text-black hover:bg-gray-800'
                  }
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Bookings List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredBookings.length === 0 ? (
              <Card className="bg-gray-900/80 border-gray-700">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-400 font-['Tajawal',sans-serif]">
                    لم يتم العثور على حجوزات للفلتر المحدد.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking._id} className="bg-gray-900/80 border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserIcon className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-bold text-white font-greta">
                          {booking.name}
                        </h3>
                        <Badge className={`${getStatusColor(booking.status)} text-white`}>
                          {getStatusText(booking.status)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400 font-['Tajawal',sans-serif]">
                        {new Date(booking.createdAt).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MailIcon className="w-4 h-4" />
                          <span className="font-['Tajawal',sans-serif]">{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <PhoneIcon className="w-4 h-4" />
                          <span className="font-['Tajawal',sans-serif]">{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <BuildingIcon className="w-4 h-4" />
                          <span className="font-['Tajawal',sans-serif]">{booking.company || 'غير محدد'}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="font-['Tajawal',sans-serif]">{booking.preferredDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <ClockIcon className="w-4 h-4" />
                          <span className="font-['Tajawal',sans-serif]">{booking.preferredTime}</span>
                        </div>
                        <div className="text-gray-300 font-['Tajawal',sans-serif]">
                          <strong>الخدمة:</strong> {booking.serviceType}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <UserIcon className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-400 font-['Tajawal',sans-serif] mb-1">معلومات الموظف:</div>
                          <p className="text-gray-300 font-['Tajawal',sans-serif]">الاسم: {booking.employeeName || 'غير معروف'}</p>
                          <p className="text-gray-300 font-['Tajawal',sans-serif]">البريد الإلكتروني: {booking.employeeEmail || 'غير معروف'}</p>
                          <p className="text-gray-300 font-['Tajawal',sans-serif]">رقم الهاتف: {booking.employeePhone || 'غير معروف'}</p>
                          <p className="text-gray-300 font-['Tajawal',sans-serif]">الخدمة: {booking.serviceType || 'غير محدد'}</p>
                        </div>
                      </div>
                    </div>

                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => authorizeBooking(booking._id)}
                          className="bg-green-600 hover:bg-green-700 text-black"
                        >
                          <CheckIcon className="w-4 h-4 mr-2" />
                          تفويض
                        </Button>
                        <Button
                          onClick={() => rejectBooking(booking._id)}
                          className="bg-red-600 hover:bg-red-700 text-black"
                        >
                          <XIcon className="w-4 h-4 mr-2" />
                          رفض
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};