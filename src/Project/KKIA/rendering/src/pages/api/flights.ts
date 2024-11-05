import type { NextApiRequest, NextApiResponse } from 'next';
import flightsData from 'src/assets/FlightSearchData.json'; // Adjust the path as necessary

export interface Flight {
  num: number;
  ID: number;
  INT_DOM: string;
  ARR_DEP: string;
  AIRLINE: string;
  AIRLINE_DESCR: string;
  FL_NUMBER: string;
  ROUTING_ENG: string;
  ROUTING_KA: string;
  PUB_RMK_ENG: string | null;
  PUB_RMK_KA: string | null;
  BAGGAGE_1: string | null;
  TERMINAL: string;
  ConDerived_EST_Time: string;
  ConDerived_SCH_Time: string;
  Created: string;
  Updated: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Flight[]>) {
  if (req.method === 'GET') {
    res.status(200).json(flightsData as Flight[]);
  }
}
