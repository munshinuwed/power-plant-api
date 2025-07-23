import { Request, Response } from 'express';
import { plants, stateTotals } from '../../lib/dataLoader';
import { calculateStatePercentage } from '../../utils/plantUtils';
import logger from '../../utils/logger';

export const getTopPlants = (req: Request, res: Response) => {
    logger.debug(`${plants.length} Total plants loaded`);
    const n = parseInt(req.query.n as string) || plants.length;
    const state = (req.query.state as string)?.toUpperCase(); 
  
    logger.info({ query: req.query }, 'Received request for /plants');
  
    let filteredPlants = plants;
    if (state) {
      filteredPlants = plants.filter(p => p.PSTATABB === state);
    }
  
    const topPlants = filteredPlants
      .sort((a, b) => b.PLNGENAN - a.PLNGENAN)
      .slice(0, n)
      .map(plant => ({
        name: plant.PNAME,
        state: plant.PSTATABB,
        absoluteGeneration: plant.PLNGENAN,
        statePercentage: calculateStatePercentage(plant, stateTotals[plant.PSTATABB] || 0),
        lat: plant.LAT,
        lon: plant.LON,
      }));
  
    res.json(topPlants);
};

export const getAllStates = (req: Request, res: Response) => {
    logger.info('Received request for /plants/states');
    const stateNames =  Object.keys(stateTotals)
    logger.info({ stateNames }, 'State totals data'); 
    res.json(stateNames);
  }