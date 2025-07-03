import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  MailIcon, 
  PhoneIcon,
  BuildingIcon,
  MessageSquareIcon,
  LogOutIcon,
  DollarSign,
  Send,
  XIcon
} from 'lucide-react';
import logoImmro from '../assets/logoImmro.png';

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
  status: 'pending' | 'priceSuggested' | 'confirmed' | 'rejected';
  createdAt: string;
  suggestedPrice?: number;
  userResponse?: 'accepted' | 'refused';
}

export const WorkerPanel: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'priceSuggested' | 'confirmed' | 'rejected'>('all');
  const [priceInputs, setPriceInputs] = useState<{ [key: string]: string }>({});
  const { user, logout } = useAuth();

  // Mock bookings for demonstration
  /*const mockBookings: Booking[] = [
    {
      _id: '1',
      name: 'Ali Benali',
      email: 'ali@client.com',
      phone: '0555123456',
      company: 'ClientCo',
      serviceType: 'خدمات التنظيف',
      preferredDate: '2025-07-01',
      preferredTime: '10:00 ص',
      message: 'أحتاج تنظيف شقة.',
      status: 'pending',
      createdAt: '2025-06-30T10:00:00Z',
    },
    {
      _id: '2',
      name: 'Sara Amari',
      email: 'sara@client.com',
      phone: '0666987654',
      company: 'SaraCo',
      serviceType: 'الميكانيكا',
      preferredDate: '2025-07-02',
      preferredTime: '11:00 ص',
      message: 'سيارتي لا تعمل.',
      status: 'priceSuggested',
      createdAt: '2025-06-30T11:00:00Z',
      suggestedPrice: 3500,
      userResponse: undefined,
    },
    {
      _id: '3',
      name: 'Omar Said',
      email: 'omar@client.com',
      phone: '0777123456',
      company: 'OmarCo',
      serviceType: 'السباكة',
      preferredDate: '2025-07-03',
      preferredTime: '12:00 م',
      message: 'تسرب ماء في الحمام.',
      status: 'confirmed',
      createdAt: '2025-06-30T12:00:00Z',
      suggestedPrice: 2000,
      userResponse: 'accepted',
    },
  ];*/

  useEffect(() => {
    const fetchEmployeeBookings = async () => {
      setLoading(true);
      try {
        // Get current employee data from localStorage
        const employeeData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!employeeData.isEmployee || !employeeData.id) {
          setBookings([]);
          setLoading(false);
          return;
        }
        // Fetch bookings for this employee from backend
        const response = await axios.post('https://goimro.onrender.com/GetBookServiceByEmployee', {
          id: employeeData.id,
          fullname: employeeData.name,
          number: employeeData.number,
          email: employeeData.email,
          password: employeeData.password,
          goldcard: employeeData.goldcard,
          service: employeeData.service
        });
        // Map backend data to Booking interface
        const employeeBookings: Booking[] = response.data.map((booking: any) => ({
          _id: booking.id || booking._id,
          name: booking.userName || booking.name || 'غير معروف',
          email: booking.userEmail || booking.email || 'غير معروف',
          phone: booking.userPhone || booking.phone || 'غير معروف',
          company: booking.userCompany || booking.company || '',
          serviceType: booking.service,
          preferredDate: booking.date,
          preferredTime: booking.time,
          message: booking.location,
          status: booking.isaothorized === "true"
            ? 'authorized'
            : booking.isaothorized === "false"
            ? 'rejected'
            : 'pending',
          suggestedPrice: booking.price ? Number(booking.price) : undefined,
          userResponse: booking.userResponse,
          createdAt: booking.createdAt || new Date().toISOString()
        }));
        setBookings(employeeBookings);
      } catch (error) {
        toast.error('فشل في جلب حجوزاتك');
        setBookings([]); // Only use mock data if you want fallback
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeBookings();
  }, []);

  const handleSuggestPrice = async (bookingId: string) => {
    const price = priceInputs[bookingId];
    if (!price || isNaN(Number(price))) {
      toast.error('يرجى إدخال سعر صالح');
      return;
    }
    
    try {
      // Get current employee data
      const employeeData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      // Update booking with price in backend
      await axios.post('https://goimro.onrender.com/UpdateBooking', {
        bookingId: bookingId,
        price: price,
        employeeId: employeeData.id,
        status: 'priceSuggested'
      });
      
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'priceSuggested', suggestedPrice: Number(price) } 
          : booking
      ));
      toast.success('تم إرسال السعر المقترح للعميل!');
    } catch (error) {
      toast.error('فشل في إرسال السعر المقترح');
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'priceSuggested': return 'bg-blue-500';
      case 'confirmed': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'priceSuggested': return 'تم اقتراح سعر';
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
            <Badge className="bg-blue-600 text-white">لوحة العامل</Badge>
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
              حجوزات خدماتك
            </h1>
            <p className="text-gray-400 font-['Tajawal',sans-serif]">
              راجع الحجوزات واقترح سعراً لكل خدمة
            </p>
          </motion.div>
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['all', 'pending', 'priceSuggested', 'confirmed', 'rejected'].map((f) => (
              <Button
                key={f}
                className={`px-4 py-2 ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setFilter(f as typeof filter)}
              >
                {getStatusText(f)}
              </Button>
            ))}
          </div>
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
                    لا توجد حجوزات للفلتر المحدد.
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
                        <MessageSquareIcon className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <div className="text-sm text-gray-400 font-['Tajawal',sans-serif] mb-1">معلومات إضافية:</div>
                          <p className="text-gray-300 font-['Tajawal',sans-serif]">{booking.message || 'غير محدد'}</p>
                        </div>
                      </div>
                    </div>
                    {/* Price Suggestion Logic */}
                    {booking.status === 'pending' && (
                      <div className="flex gap-2 items-center">
                        <Input
                          type="number"
                          min="0"
                          placeholder="اقترح سعراً (دج)"
                          value={priceInputs[booking._id] || ''}
                          onChange={e => setPriceInputs({ ...priceInputs, [booking._id]: e.target.value })}
                          className="w-32 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        />
                        <Button
                          onClick={() => handleSuggestPrice(booking._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          إرسال السعر
                        </Button>
                      </div>
                    )}
                    {booking.status === 'priceSuggested' && (
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center gap-2 text-blue-400">
                          <DollarSign className="w-4 h-4" />
                          <span>السعر المقترح: <b>{booking.suggestedPrice} دج</b></span>
                        </div>
                        <div className="text-gray-400 text-sm">بانتظار رد العميل...</div>
                      </div>
                    )}
                    {booking.status === 'confirmed' && booking.userResponse === 'accepted' && (
                      <div className="flex items-center gap-2 text-green-400 mt-2">
                        <Send className="w-4 h-4" />
                        <span>تم قبول السعر من العميل! الخدمة مؤكدة.</span>
                      </div>
                    )}
                    {booking.status === 'confirmed' && booking.userResponse === 'refused' && (
                      <div className="flex items-center gap-2 text-red-400 mt-2">
                        <XIcon className="w-4 h-4" />
                        <span>رفض العميل السعر المقترح.</span>
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