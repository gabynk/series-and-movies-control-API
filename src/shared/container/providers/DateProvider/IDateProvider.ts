interface IDateProvider {
  addDays(days: number): Date;
  // compareInHours(start_date: Date, end_date: Date): number;
  // convertToUTC(date: Date): string;
  // dateNow(): Date;
  // compareInDays(start_date: Date, end_date: Date): number;
  // addHours(hours: number): Date;
  // compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
