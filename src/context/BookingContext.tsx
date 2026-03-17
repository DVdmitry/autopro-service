'use client';

import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import type { BookingState, BookingStep, VehicleInfo, CustomerInfo } from '@/types/auto-service.types';

const INITIAL_STATE: BookingState = {
  currentStep: 'vehicle',
  vehicle: {},
  serviceId: '',
  selectedOptionId: '',
  mechanicId: '',
  slotDate: '',
  slotTime: '',
  customer: {},
  problemDescription: '',
  urgency: 'normal',
  contactMethod: 'phone',
};

type Action =
  | { type: 'SET_STEP'; step: BookingStep }
  | { type: 'SET_VEHICLE'; vehicle: Partial<VehicleInfo> }
  | { type: 'SET_SERVICE'; serviceId: string }
  | { type: 'SET_OPTION'; optionId: string }
  | { type: 'SET_MECHANIC'; mechanicId: string }
  | { type: 'SET_SLOT'; date: string; time: string }
  | { type: 'SET_CUSTOMER'; customer: Partial<CustomerInfo> }
  | { type: 'SET_DETAILS'; problem: string; urgency: 'normal' | 'urgent'; contact: 'phone' | 'email' | 'whatsapp' }
  | { type: 'RESET' };

function bookingReducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.step };
    case 'SET_VEHICLE':
      return { ...state, vehicle: { ...state.vehicle, ...action.vehicle } };
    case 'SET_SERVICE':
      return { ...state, serviceId: action.serviceId, selectedOptionId: '', mechanicId: '' };
    case 'SET_OPTION':
      return { ...state, selectedOptionId: action.optionId };
    case 'SET_MECHANIC':
      return { ...state, mechanicId: action.mechanicId };
    case 'SET_SLOT':
      return { ...state, slotDate: action.date, slotTime: action.time };
    case 'SET_CUSTOMER':
      return { ...state, customer: { ...state.customer, ...action.customer } };
    case 'SET_DETAILS':
      return { ...state, problemDescription: action.problem, urgency: action.urgency, contactMethod: action.contact };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

const BookingContext = createContext<BookingState>(INITIAL_STATE);
const BookingDispatchContext = createContext<Dispatch<Action>>(() => {});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, INITIAL_STATE);

  return (
    <BookingContext.Provider value={state}>
      <BookingDispatchContext.Provider value={dispatch}>
        {children}
      </BookingDispatchContext.Provider>
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingState {
  return useContext(BookingContext);
}

export function useBookingDispatch(): Dispatch<Action> {
  return useContext(BookingDispatchContext);
}

const STEPS: BookingStep[] = ['vehicle', 'service', 'options', 'datetime', 'contact', 'confirmation'];

export function getStepIndex(step: BookingStep): number {
  return STEPS.indexOf(step);
}

export function getNextStep(current: BookingStep): BookingStep | null {
  const idx = STEPS.indexOf(current);
  return idx < STEPS.length - 1 ? STEPS[idx + 1] : null;
}

export function getPrevStep(current: BookingStep): BookingStep | null {
  const idx = STEPS.indexOf(current);
  return idx > 0 ? STEPS[idx - 1] : null;
}
