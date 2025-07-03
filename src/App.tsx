//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ElementLight } from './screens/ElementLight';
import { Login } from './screens/Auth/Login';
import { Signup } from './screens/Auth/Signup';
import { BookCall } from './screens/BookCall/BookCall';
import { AdminPanel } from './screens/Admin/AdminPanel';
import { Payment } from './screens/Payment/Payment';
import { Contact } from './screens/Contact/Contact';
//import { ProtectedRoute } from './components/ProtectedRoute';
import { WorkerPanel } from './screens/WorkerPanel';
import { UserPanel } from './screens/UserPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ElementLight />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/book-call" element={<BookCall />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/admin" 
              element={
                  <AdminPanel />
              } 
            />
            <Route 
              path="/worker-panel" 
              element={<WorkerPanel />} 
            />
            <Route 
              path="/user-panel" 
              element={<UserPanel />} 
            />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0D0D0D',
                color: '#fff',
                border: '1px solid #222222',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;