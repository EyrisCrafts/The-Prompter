import { toast } from 'react-hot-toast';

export function generateId() {
  return Math.random().toString(36).substring(2);
}

export function showErrorToast(message: string) {
    toast.error(message, {
        style: {
        background: '#333',
        color: "#8D8D8D"
        }
    });
}