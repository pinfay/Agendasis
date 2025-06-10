export const businessConfig = {
  hours: {
    opening: 8, // 8:00
    closing: 20, // 20:00
  },
  daysOff: [0], // 0 = Sunday
  appointmentDuration: {
    minDuration: 30, // minimum duration in minutes
    maxDuration: 180, // maximum duration in minutes
  },
  scheduling: {
    maxDaysInAdvance: 30, // how many days in advance appointments can be made
    minTimeBeforeAppointment: 60, // minimum minutes before appointment
  },
  services: {
    categories: [
      'Corte',
      'Barba',
      'Tratamentos',
      'Coloração',
      'Combos'
    ]
  },
  cancelation: {
    allowedUntilHoursBefore: 24, // hours before appointment when cancellation is still allowed
    refundPolicy: {
      fullRefund: 48, // hours before appointment for full refund
      partialRefund: 24, // hours before appointment for partial refund
      partialRefundPercentage: 50 // percentage of refund for partial refunds
    }
  }
}; 