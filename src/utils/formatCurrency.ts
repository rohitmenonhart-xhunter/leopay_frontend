/**
 * Formats a number as Indian Rupees (₹)
 * @param amount - The amount to format
 * @param maximumFractionDigits - Maximum number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, maximumFractionDigits: number = 2): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits
  }).format(amount);
};

export default formatCurrency; 