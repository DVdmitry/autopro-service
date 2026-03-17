/* ─── Domain entities ─── */

export interface Mechanic {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  bio: string;
  languages: string[];
  isActive: boolean;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  basePrice: number;
  durationMinutes: number;
  icon: string;
}

export type ServiceCategory =
  | 'maintenance'
  | 'brakes'
  | 'tires'
  | 'engine'
  | 'electrical'
  | 'suspension'
  | 'transmission'
  | 'bodywork'
  | 'detailing';

export interface ServiceOption {
  id: string;
  serviceId: string;
  name: string;
  brand: string;
  tier: 'budget' | 'standard' | 'premium';
  price: number;
  description: string;
  compatibleMakes: string[];
}

/* ─── Scheduling ─── */

export interface SlotInfo {
  id: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked';
}

export interface Schedule {
  id: number;
  mechanicId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isWorking: boolean;
}

/* ─── Booking ─── */

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface BookingState {
  currentStep: BookingStep;
  vehicle: Partial<VehicleInfo>;
  serviceId: string;
  selectedOptionId: string;
  mechanicId: string;
  slotDate: string;
  slotTime: string;
  customer: Partial<CustomerInfo>;
  problemDescription: string;
  urgency: 'normal' | 'urgent';
  contactMethod: 'phone' | 'email' | 'whatsapp';
}

export type BookingStep =
  | 'vehicle'
  | 'service'
  | 'options'
  | 'datetime'
  | 'contact'
  | 'confirmation';

export interface CreateAppointmentRequest {
  mechanicId: string;
  serviceId: string;
  selectedOptionId?: string;
  slotDate: string;
  slotStartTime: string;
  vehicle: VehicleInfo;
  customer: CustomerInfo;
  problemDescription?: string;
  urgency?: string;
  contactMethod?: string;
}

export interface AppointmentResponse {
  appointmentId: string;
  confirmationNumber: string;
  status: string;
  message: string;
  details: {
    mechanic: { name: string; specialization: string };
    service: { name: string; price: number };
    option?: { name: string; price: number };
    vehicle: { make: string; model: string; year: number };
    dateTime: string;
    duration: number;
    totalPrice: number;
  };
}
