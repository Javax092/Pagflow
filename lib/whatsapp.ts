export function buildWhatsAppUrl(number: string, message: string) {
  const internationalNumber = number.replace(/[+\s().-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(internationalNumber)) return "";
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}
