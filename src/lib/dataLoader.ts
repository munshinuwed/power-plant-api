import ExcelJS from 'exceljs';
import type { Plant, StateTotals } from '../types/powerPlants.types';
import { CONFIG } from '../config/config';
import logger from '../utils/logger';
import axios from 'axios';



const [PSTATABB_INDEX, PNAME_INDEX, PLNGENAN_INDEX, LAT_INDEX, LON_INDEX] = [3, 4, 41, 20, 21];
export let plants: Plant[] = [];
export let stateTotals: StateTotals = {};

export async function loadData(): Promise<void> {
  try {
    const response = await axios.get(CONFIG.EGRID_URL, {
        responseType: 'stream',
      });
    const workbook = new ExcelJS.stream.xlsx.WorkbookReader(response.data, { entries: 'emit' });

    for await (const worksheetReader of workbook) {

      for await (const row of worksheetReader) {
        if(row.worksheet.name !== CONFIG.EGRID_SHEET) continue;
        const rowData = row.values as string[];
        if(!CONFIG.IGNORED_HEADER_VALUES.includes(rowData[3]) && !CONFIG.IGNORED_HEADER_VALUES.includes(rowData[4])) {
        const currentPlant: Plant = {
          PNAME: rowData[PNAME_INDEX] || '',
          PSTATABB: rowData[PSTATABB_INDEX] || '',
          PLNGENAN: Number(rowData[PLNGENAN_INDEX]) || 0,
          LAT: Number(rowData[LAT_INDEX]) || 0,
          LON: Number(rowData[LON_INDEX]) || 0,
        };
    
        plants.push(currentPlant);

        if (!stateTotals[currentPlant.PSTATABB]) stateTotals[currentPlant.PSTATABB] = 0;
        stateTotals[currentPlant.PSTATABB] += currentPlant.PLNGENAN;
      }

    }
  }

    if (plants.length === 0) {
      throw new Error('No data loaded from PLNT21 sheet');
    }

    logger.info({ plantCount: plants.length }, 'Loaded plants from PLNT21 sheet');
  } catch (error) {
    logger.error({ error }, 'Error loading data');
    throw error; // Rethrow to handle in server.ts
  }
}
