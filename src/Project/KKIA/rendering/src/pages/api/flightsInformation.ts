import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export interface AircraftSubType {
  id: number;
  code: string;
  description: string;
  aircraftCategory: string;
  class: string;
  wingspan: number;
  length: number;
  bridgeRequired: boolean;
  manufacturer: string;
  aircraftModel: string;
}

export interface Flight {
  id: number;
  number: string;
  flightNumberSuffix: string;
  originDate: string;
  scheduled: string;
  estimated: string | null;
  actual: string | null;
  onBlock: string | null;
  offBlock: string | null;
  takeOff: string | null;
  firstBag: string | null;
  lastBag: string | null;
  calculated: string | null;
  calculatedTakeOff: string | null;
  internationalStatus: string;
  associatedFlightNumber: string;
  aircraftParkingPositionQualifier: string | null;
  aircraftTerminal: string;
  aircraftRegistrationNumber: string | null;
  departureOrArrival: string;
  passengerGate: string;
  touchDown: string | null;
  updated: string;
  active: number;
  aircraftSubType: AircraftSubType | null;
  airline: {
    id: number;
    code: string;
    description: string;
    callSign: string;
    baseAirport: string;
    flag: boolean;
    country: {
      id: number;
      code: string;
      name: string;
      region: {
        id: number;
        name: string;
        description: string;
      };
    };
  };
  arrivalAirport: {
    id: number;
    code: string;
    name: string;
    description: string;
    airportCategory: string;
    flag: boolean;
    city: {
      id: number;
      code: string;
      name: string;
      country: {
        id: number;
        code: string;
        name: string;
        region: {
          id: number;
          name: string;
          description: string;
        };
      };
    };
  };
  associatedFlightAirline: {
    id: number;
    code: string;
    description: string;
    callSign: string;
    baseAirport: string;
    flag: boolean;
    country: {
      id: number;
      code: string;
      name: string;
      region: {
        id: number;
        name: string;
        description: string;
      };
    };
  };
  associatedFlightArrivalAirport: {
    id: number;
    code: string;
    name: string;
    description: string;
    airportCategory: string;
    flag: boolean;
    city: {
      id: number;
      code: string;
      name: string;
      country: {
        id: number;
        code: string;
        name: string;
        region: {
          id: number;
          name: string;
          description: string;
        };
      };
    };
  };
  associatedFlightDepartureAirport: {
    id: number;
    code: string;
    name: string;
    description: string;
    airportCategory: string;
    flag: boolean;
    city: {
      id: number;
      code: string;
      name: string;
      country: {
        id: number;
        code: string;
        name: string;
        region: {
          id: number;
          name: string;
          description: string;
        };
      };
    };
  };
  checkInFirstPositionResource: string | null;
  checkInLastPositionResource: string | null;
  departureAirport: {
    id: number;
    code: string;
    name: string;
    description: string;
    airportCategory: string;
    flag: boolean;
    city: {
      id: number;
      code: string;
      name: string;
      country: {
        id: number;
        code: string;
        name: string;
        region: {
          id: number;
          name: string;
          description: string;
        };
      };
    };
  };
  flightRemarkes: [];
  remark: {
    id: number;
    code: string;
    description: string;
  };
  runwayResource: string | null;
}

type FlightResponse = Flight[] | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<FlightResponse>) {
  const apiUrl = process.env.NEXT_FLIGHT_SEARCH_API_URL;
  const subscriptionKey = process.env.NEXT_FLIGHT_SEARCH_API_SUBSCRIBTION_KEY;

  if (!apiUrl || !subscriptionKey) {
    return res.status(500).json({ error: 'Missing API configuration' });
  }

  try {
    const response = await axios.get(`${apiUrl}?fs-api-subscription=${subscriptionKey}`);
    res.status(200).json(response.data as Flight[]);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
}
