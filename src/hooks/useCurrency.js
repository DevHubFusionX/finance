import { useAuthStore } from '../store/authStore';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: '$',
  AUD: '$',
  JPY: '¥',
  INR: '₹',
  NGN: '₦',
  CNY: '¥',
  CHF: 'Fr',
  BRL: 'R$',
  MXN: '$',
  ZAR: 'R',
  KRW: '₩'
};

export const useCurrency = () => {
  const { user } = useAuthStore();
  const currency = user?.preferences?.currency || 'USD';
  const symbol = currencySymbols[currency] || '$';

  const formatAmount = (amount, showSymbol = true) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(numAmount)) return showSymbol ? `${symbol}0.00` : '0.00';
    
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(numAmount));
    
    return showSymbol ? `${symbol}${formatted}` : formatted;
  };

  return {
    currency,
    symbol,
    formatAmount
  };
};