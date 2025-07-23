export interface Plant {
    PNAME: string;
    PSTATABB: string;
    PLNGENAN: number;
    LAT: number;
    LON: number;
  }
  
export interface StateTotals {
  [state: string]: number;
}
  