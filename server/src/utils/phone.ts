// Normalize to +91XXXXXXXXXX
export const normalizePhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, ""); // strip non-digits
    if (digits.length === 10) return `+91${digits}`;
    if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
    throw new Error("Invalid phone number. Use a 10-digit Indian mobile number.");
};