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
  UserIcon, 
  MailIcon, 
  PhoneIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  DollarSign,
  CheckIcon,
  XIcon,
  LogOutIcon,
  SearchIcon,
  FilterIcon
} from 'lucide-react';
import logoImmro from '../assets/logoImmro.png';

interface Worker {
  _id: string;
  fullname: string;
  email: string;
  number: string;
  service: string;
  rating?: number;
  reviews?: number;
}

interface Booking {
  _id: string;
  workerId: string;
  workerName: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: 'pending' | 'priceSuggested' | 'confirmed' | 'rejected';
  suggestedPrice?: number;
  userResponse?: 'accepted' | 'refused';
  createdAt: string;
}

interface BookingForm {
  employeeId: string;
  service: string;
  date: string;
  time: string;
  location: string;
}

export const UserPanel: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'workers' | 'bookings'>('workers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const { user, logout } = useAuth();

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

  // Mock data for demonstration
  const mockWorkers: Worker[] = [
    {
      _id: '1',
      fullname: 'أحمد محمد',
      email: 'ahmed@worker.com',
      number: '0555123456',
      service: 'خدمات التنظيف',
      rating: 4.8,
      reviews: 24
    },
    {
      _id: '2',
      fullname: 'محمد علي',
      email: 'mohamed@worker.com',
      number: '0666987654',
      service: 'السباكة',
      rating: 4.9,
      reviews: 31
    },
    {
      _id: '3',
      fullname: 'علي أحمد',
      email: 'ali@worker.com',
      number: '0777123456',
      service: 'الخدمات الكهربائية',
      rating: 4.7,
      reviews: 18
    }
  ];

  const mockBookings: Booking[] = [
    {
      _id: '1',
      workerId: '1',
      workerName: 'أحمد محمد',
      serviceType: 'خدمات التنظيف',
      preferredDate: '2025-07-01',
      preferredTime: '10:00 ص',
      message: 'أحتاج تنظيف شقة.',
      status: 'priceSuggested',
      suggestedPrice: 2500,
      userResponse: undefined,
      createdAt: '2025-06-30T10:00:00Z'
    },
    {
      _id: '2',
      workerId: '2',
      workerName: 'محمد علي',
      serviceType: 'السباكة',
      preferredDate: '2025-07-02',
      preferredTime: '11:00 ص',
      message: 'تسرب ماء في الحمام.',
      status: 'confirmed',
      suggestedPrice: 1800,
      userResponse: 'accepted',
      createdAt: '2025-06-30T11:00:00Z'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch workers from backend
        const workersRes = await axios.get('https://goimro.onrender.com/GetEmployee');
        setWorkers(workersRes.data.map((emp: any) => ({
          _id: emp.id,
          fullname: emp.fullname,
          email: emp.email,
          number: emp.number,
          service: emp.service,
          rating: 4.5, // Mock rating for now
          reviews: Math.floor(Math.random() * 50) + 10 // Mock reviews
        })));
        
        // For now, use mock bookings. In production, you'd fetch user-specific bookings
        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('فشل في جلب البيانات');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = !selectedService || worker.service === selectedService;
    return matchesSearch && matchesService;
  });

  const handleBookService = (worker: Worker) => {
    setSelectedWorker(worker);
    setShowBookingForm(true);
  };

  const handleSubmitBooking = async (data: BookingForm) => {
    try {
      // Get current user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      // Send booking request to backend
      const bookingData = {
        userid: userData.id,
        employeeId: data.employeeId,
        service: data.service,
        date: data.date,
        time: data.time,
        location: data.location,
        isaothorized: "false", // Only admin can authorize
        price: "1000" // Only employee can set price
      };
      
      await axios.post('https://goimro.onrender.com/CreateBookSevice', bookingData);
      
      // Add to local state for immediate UI update
      const newBooking: Booking = {
        _id: Date.now().toString(),
        workerId: data.employeeId,
        workerName: selectedWorker?.fullname || '',
        serviceType: data.service,
        preferredDate: data.date,
        preferredTime: data.time,
        message: data.location,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      setBookings([...bookings, newBooking]);
      setShowBookingForm(false);
      setSelectedWorker(null);
      toast.success('تم إرسال طلب الحجز بنجاح! في انتظار موافقة الإدارة');
    } catch (error) {
      toast.error('فشل في إرسال طلب الحجز');
    }
  };

  const handlePriceResponse = (bookingId: string, response: 'accepted' | 'refused') => {
    setBookings(bookings.map(booking => 
      booking._id === bookingId 
        ? { ...booking, status: 'confirmed', userResponse: response }
        : booking
    ));
    toast.success(`تم ${response === 'accepted' ? 'قبول' : 'رفض'} السعر بنجاح!`);
  };

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
            <Badge className="bg-green-600 text-white">لوحة المستخدم</Badge>
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
              لوحة المستخدم
            </h1>
            <p className="text-gray-900 font-['Tajawal',sans-serif]">
              تصفح العمال واحجز الخدمات
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              className={`px-4 py-2 ${activeTab === 'workers' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
              onClick={() => setActiveTab('workers')}
            >
              تصفح العمال
            </Button>
            <Button
              className={`px-4 py-2 ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
              onClick={() => setActiveTab('bookings')}
            >
              حجوزاتي
            </Button>
          </div>

          {activeTab === 'workers' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="ابحث عن عامل أو خدمة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:border-blue-500 focus:outline-none"
                >
                  <option value="">جميع الخدمات</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Workers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkers.map((worker) => (
                  <Card key={worker._id} className="bg-gray-900/80 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <UserIcon className="w-8 h-8 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-bold text-white font-['Tajawal',sans-serif]">
                              {worker.fullname}
                            </h3>
                            <p className="text-gray-400 font-['Tajawal',sans-serif]">
                              {worker.service}
                            </p>
                          </div>
                        </div>
                        {worker.rating && (
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-['Tajawal',sans-serif]">
                              {worker.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MailIcon className="w-4 h-4" />
                          <span className="font-['Tajawal',sans-serif]">{worker.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <PhoneIcon className="w-4 h-4" />
                          <span className="font-['Tajawal',sans-serif]">{worker.number}</span>
                        </div>
                        {worker.reviews && (
                          <div className="text-gray-400 font-['Tajawal',sans-serif] text-sm">
                            {worker.reviews} تقييم
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => handleBookService(worker)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-black"
                      >
                        احجز خدمة
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {bookings.length === 0 ? (
                <Card className="bg-gray-900/80 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-400 font-['Tajawal',sans-serif]">
                      لا توجد حجوزات حتى الآن.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                bookings.map((booking) => (
                  <Card key={booking._id} className="bg-gray-900/80 border-gray-700">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <UserIcon className="w-5 h-5 text-blue-400" />
                          <h3 className="text-lg font-bold text-white font-['Tajawal',sans-serif]">
                            {booking.workerName}
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
                          <div className="text-gray-300 font-['Tajawal',sans-serif]">
                            <strong>الخدمة:</strong> {booking.serviceType}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <CalendarIcon className="w-4 h-4" />
                            <span className="font-['Tajawal',sans-serif]">{booking.preferredDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <ClockIcon className="w-4 h-4" />
                            <span className="font-['Tajawal',sans-serif]">{booking.preferredTime}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-gray-300 font-['Tajawal',sans-serif]">
                            <strong>الرسالة:</strong> {booking.message}
                          </div>
                          {booking.suggestedPrice && (
                            <div className="flex items-center gap-2 text-blue-400">
                              <DollarSign className="w-4 h-4" />
                              <span>السعر المقترح: <b>{booking.suggestedPrice} دج</b></span>
                            </div>
                          )}
                        </div>
                      </div>

                      {booking.status === 'priceSuggested' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handlePriceResponse(booking._id, 'accepted')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckIcon className="w-4 h-4 mr-2" />
                            قبول السعر
                          </Button>
                          <Button
                            onClick={() => handlePriceResponse(booking._id, 'refused')}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <XIcon className="w-4 h-4 mr-2" />
                            رفض السعر
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-bold text-white font-['Tajawal',sans-serif] mb-4">
              احجز خدمة مع {selectedWorker.fullname}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSubmitBooking({
                employeeId: selectedWorker._id,
                service: formData.get('service') as string,
                date: formData.get('date') as string,
                time: formData.get('time') as string,
                location: formData.get('location') as string
              });
            }} className="space-y-4">
              <div>
                <select
                  name="service"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:border-blue-500 focus:outline-none"
                >
                  <option value="">اختر نوع الخدمة</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div>
                <Input
                  name="date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  name="time"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:border-blue-500 focus:outline-none"
                >
                  <option value="">اختر الوقت المفضل</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <Input
                  name="location"
                  type="text"
                  placeholder="موقع الخدمة (العنوان)"
                  required
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  إرسال الطلب
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}; 