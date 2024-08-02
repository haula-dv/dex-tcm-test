import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

// Format week day
class CustomString extends String {
  charAt(_: number): string {
    return this.valueOf();
  }
}

const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const customWeekDays = weekDays.map((day) => new CustomString(day) as string);

export class CustomDateAdapter extends AdapterDateFns {
  getWeekdays = (): string[] => customWeekDays;
}
