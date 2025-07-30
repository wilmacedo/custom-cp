import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  duration?: number;
  message: string;
  onClose: () => void;
  type: 'error' | 'info' | 'success';
}

export function Toast({ duration = 5000, message, onClose, type }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Aguarda a animação terminar
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      case 'info':
        return 'bg-blue-500 text-white border-blue-600';
      case 'success':
        return 'bg-green-500 text-white border-green-600';
      default:
        return 'bg-gray-500 text-white border-gray-600';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`flex items-center gap-3 rounded-lg border p-4 shadow-lg ${getTypeStyles()}`}>
        <span className="flex-1">{message}</span>
        <button
          className="ml-2 rounded-full p-1 hover:bg-white/20"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
