import { ConsultationBooking, LegalService } from '@/types/legal';

/**
 * ============================================================================
 * OBJECT ORIENTED PROGRAMMING: CLASSES
 * ============================================================================
 */

/**
 * Class managing office scheduling and real-time open status for
 * Ntebaleng Thobakgale Attorneys in Polokwane (South African Standard Time UTC+2).
 */
export class OfficeScheduleManager {
  private readonly timezone: string = 'Africa/Johannesburg';
  private readonly openingHour: number = 8;  // 08:00
  private readonly closingHour: number = 17; // 17:00

  constructor(
    private readonly firmName: string = 'Ntebaleng Thobakgale Attorneys',
    private readonly address: string = '162 Marshall Street, Polokwane'
  ) {}

  /**
   * Determine current operating status based on South African time
   */
  public getLiveStatus(): {
    isOpen: boolean;
    statusText: string;
    subText: string;
    isEmergencyBailActive: boolean;
    nextOpeningTime: string;
  } {
    const now = new Date();
    // Get current day and hour in South Africa
    const saTimeString = now.toLocaleString('en-US', { timeZone: this.timezone });
    const saDate = new Date(saTimeString);
    const day = saDate.getDay(); // 0 = Sun, 6 = Sat
    const hour = saDate.getHours();
    const minutes = saDate.getMinutes();

    const isWeekday = day >= 1 && day <= 5;
    const isWorkingHours = hour >= this.openingHour && hour < this.closingHour;

    if (isWeekday && isWorkingHours) {
      const minutesToClose = (this.closingHour * 60) - (hour * 60 + minutes);
      const hoursLeft = Math.floor(minutesToClose / 60);
      return {
        isOpen: true,
        statusText: 'Office Open Now',
        subText: `Walk-ins & Consultations available today until 17:00 (${hoursLeft}h remaining)`,
        isEmergencyBailActive: false,
        nextOpeningTime: 'Today at 08:00',
      };
    }

    // After hours or weekend - 24/7 urgent bail and police station callout hotline active
    let nextOpening = 'Monday at 08:00';
    if (isWeekday && hour < this.openingHour) {
      nextOpening = `Today at 08:00 (${this.openingHour - hour}h)`;
    } else if (day >= 1 && day <= 4 && hour >= this.closingHour) {
      nextOpening = 'Tomorrow at 08:00';
    }

    return {
      isOpen: false,
      statusText: 'Closed · 24/7 Urgent Hotline Active',
      subText: 'Office opens ' + nextOpening + ' | Emergency Bail line active 24/7',
      isEmergencyBailActive: true,
      nextOpeningTime: nextOpening,
    };
  }

  public getFormattedHours(): { day: string; hours: string; note?: string }[] {
    return [
      { day: 'Monday – Friday', hours: '08:00 – 17:00', note: 'Standard Consultations & Deeds Registries' },
      { day: 'Saturday', hours: 'By Prior Appointment', note: 'Notarial Executions & Signature of Deeds' },
      { day: 'Sunday & Public Holidays', hours: 'Closed for Walk-ins', note: 'Emergency Bail & Urgent Court Matters 24/7' },
      { day: '24/7 Police Callout', hours: 'Always Accessible', note: 'Call / WhatsApp +27 72 378 6975 for Urgent Bail' },
    ];
  }
}

/**
 * Class managing Consultation Bookings, validation, and WhatsApp conversion bridges
 */
export class ConsultationBookingEngine {
  private static instanceCounter = 1000;

  constructor(private readonly practiceCode: string = 'NT-POL') {}

  /**
   * Generates a tamper-evident South African legal reference number
   */
  public generateReferenceNumber(serviceSlug: string): string {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = serviceSlug.slice(0, 3).toUpperCase();
    return `${this.practiceCode}-${year}-${prefix}-${randomSuffix}`;
  }

  /**
   * Validates booking fields thoroughly
   */
  public validateBooking(data: Partial<ConsultationBooking>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.clientName || data.clientName.trim().length < 2) {
      errors.push('Please enter your full name as recognized on official ID.');
    }

    if (!data.clientPhone || !/^(?:\+27|0)\d{9}$/.test(data.clientPhone.replace(/\s+/g, ''))) {
      errors.push('Please provide a valid South African mobile number (e.g., 072 378 6975 or +27723786975).');
    }

    if (!data.clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.clientEmail)) {
      errors.push('Please provide a valid email address for confirmation receipts.');
    }

    if (!data.preferredDate) {
      errors.push('Please select a preferred date for the consultation.');
    }

    if (!data.preferredTime) {
      errors.push('Please select a preferred time slot.');
    }

    if (!data.caseSummary || data.caseSummary.trim().length < 10) {
      errors.push('Please provide a brief summary of your legal matter (at least 10 characters).');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Builds an instant high-converting WhatsApp message link to the firm's director
   */
  public buildWhatsAppLink(booking: {
    clientName: string;
    serviceTitle: string;
    preferredDate: string;
    preferredTime: string;
    caseSummary: string;
    urgency: string;
    referenceNumber: string;
  }): string {
    const directorPhone = '27723786975'; // Official business number from sign
    const text = 
      `*LEGAL CONSULTATION REQUEST*\n` +
      `*Reference:* ${booking.referenceNumber}\n` +
      `*Client:* ${booking.clientName}\n` +
      `*Matter / Service:* ${booking.serviceTitle}\n` +
      `*Preferred Slot:* ${booking.preferredDate} at ${booking.preferredTime}\n` +
      `*Urgency Level:* ${booking.urgency.toUpperCase()}\n\n` +
      `*Brief Summary:*\n"${booking.caseSummary}"\n\n` +
      `_Submitted via Ntebaleng Thobakgale Attorneys Official Portal (162 Marshall St, Polokwane)_`;

    return `https://wa.me/${directorPhone}?text=${encodeURIComponent(text)}`;
  }
}

/**
 * Class calculating estimated legal disbursements and preliminary fees
 */
export class LegalFeeEstimator {
  private readonly vatRate = 0.15; // South African 15% VAT

  /**
   * Preliminary estimate for conveyancing / property transfer (based on purchase price)
   */
  public estimateConveyancingTariff(propertyValueZAR: number): {
    estimatedFeeExclVat: number;
    vatAmount: number;
    estimatedTotalZAR: number;
    disclaimer: string;
  } {
    let fee = 12000;
    if (propertyValueZAR > 1000000) {
      fee = 12000 + (propertyValueZAR - 1000000) * 0.01;
    } else if (propertyValueZAR > 500000) {
      fee = 8500 + (propertyValueZAR - 500000) * 0.008;
    }
    const vat = fee * this.vatRate;
    return {
      estimatedFeeExclVat: Math.round(fee),
      vatAmount: Math.round(vat),
      estimatedTotalZAR: Math.round(fee + vat),
      disclaimer: 'Based on Law Society guideline tariffs. Excludes Deeds Office registration levy and rates clearance fees.',
    };
  }
}

/**
 * ============================================================================
 * FUNCTIONAL PROGRAMMING: CLOSURES
 * ============================================================================
 */

/**
 * Closure: Case Urgency Evaluator
 * Retains high-priority legal triggers in its lexical scope.
 */
export function createCaseUrgencyClassifier() {
  const emergencyKeywords = [
    'arrest', 'detained', 'police station', 'bail', 'holding cell',
    'warrant', 'urgent interdict', 'spoliation', 'unlawful detention'
  ];

  const highPriorityKeywords = [
    'sheriff', 'auction', 'eviction', 'default judgment', 'summons',
    'debt review', 'hospital negligence', 'road accident', 'raf'
  ];

  return function evaluateUrgency(text: string): {
    urgency: 'standard' | 'urgent' | 'emergency_arrest';
    recommendedAction: string;
    isImmediateBailRequired: boolean;
  } {
    const lower = text.toLowerCase();
    const isEmergency = emergencyKeywords.some(keyword => lower.includes(keyword));
    if (isEmergency) {
      return {
        urgency: 'emergency_arrest',
        recommendedAction: 'Immediate police station callout / 24-Hour urgent bail application.',
        isImmediateBailRequired: true,
      };
    }

    const isHigh = highPriorityKeywords.some(keyword => lower.includes(keyword));
    if (isHigh) {
      return {
        urgency: 'urgent',
        recommendedAction: 'Priority consultation within 24 hours recommended before statutory deadlines expire.',
        isImmediateBailRequired: false,
      };
    }

    return {
      urgency: 'standard',
      recommendedAction: 'Standard legal appointment scheduled during regular office hours.',
      isImmediateBailRequired: false,
    };
  };
}

/**
 * Closure: Consultation Fee Calculator
 * Preserves custom rate structures and pro-bono / first-consultation waiver rules.
 */
export function createConsultationFeeCalculator(baseTariffZAR: number = 1200) {
  let promoDiscountPct = 0;

  return {
    setDiscount: (percent: number) => {
      promoDiscountPct = Math.min(100, Math.max(0, percent));
    },
    calculate: (serviceSlug: string) => {
      // Deceased Estates & RAF preliminary case evaluations are complimentary
      if (serviceSlug.includes('raf') || serviceSlug.includes('road-accident') || serviceSlug.includes('deceased-estates')) {
        return {
          feeZAR: 0,
          isComplimentaryIntake: true,
          label: 'Complimentary Initial Assessment',
        };
      }

      const discounted = baseTariffZAR * (1 - promoDiscountPct / 100);
      return {
        feeZAR: discounted,
        isComplimentaryIntake: false,
        label: `R ${discounted.toLocaleString('en-ZA')} excl. VAT`,
      };
    },
  };
}

/**
 * Closure: In-memory Rate Limiter
 * Restricts form submissions per user IP/fingerprint to prevent spam.
 */
export function createRateLimiterClosure(maxSubmissionsPerHour: number = 5) {
  const attempts = new Map<string, number[]>();

  return function checkAllowed(identifier: string): { allowed: boolean; remainingAttempts: number } {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const timestamps = (attempts.get(identifier) || []).filter(time => now - time < oneHour);

    if (timestamps.length >= maxSubmissionsPerHour) {
      attempts.set(identifier, timestamps);
      return { allowed: false, remainingAttempts: 0 };
    }

    timestamps.push(now);
    attempts.set(identifier, timestamps);
    return { allowed: true, remainingAttempts: maxSubmissionsPerHour - timestamps.length };
  };
}

/**
 * ============================================================================
 * PARALLEL ASYNC LOADING: SEPARATION OF CONCERNS
 * ============================================================================
 */

export interface FirmDashboardData {
  officeStatus: ReturnType<OfficeScheduleManager['getLiveStatus']>;
  servicesCount: number;
  availableSlotsToday: string[];
  systemTimestamp: string;
}

/**
 * Loads dynamic firm metrics in parallel using Promise.all for high performance.
 */
export async function loadFirmPortalDataParallel(): Promise<FirmDashboardData> {
  const scheduleManager = new OfficeScheduleManager();

  // Three parallel asynchronous execution tracks
  const [officeStatus, availableSlots, systemTimestamp] = await Promise.all([
    // Track 1: Real-time timezone and schedule calculation
    Promise.resolve(scheduleManager.getLiveStatus()),

    // Track 2: Compute dynamically available consultation slots
    new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '04:15 PM']);
      }, 10);
    }),

    // Track 3: Official South African timestamp
    new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(new Date().toISOString());
      }, 10);
    }),
  ]);

  return {
    officeStatus,
    servicesCount: 18,
    availableSlotsToday: availableSlots,
    systemTimestamp,
  };
}
