import type Activity from '~/models/activity';

/* eslint-disable camelcase */
export interface IStravaTokenRequest {
  grant_type: string;
  code?: string;
  refresh_token?: string;
}

export interface IStravaTokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete: IStravaAthlete;
}

export interface IStravaAthlete {
  firstname: string;
  lastname: string;
}

export interface IStravaActivity {
  id: number;
  type: string;
  name: string;
  start_date: string;
  start_latlng: number[];
  end_latlng: number[];
  map?: {
    summary_polyline: string
  };
  distance: number;
  moving_time: number;
}

export enum ActivityType {
  AlpineSki = 'AlpineSki',
  BackcountrySki = 'BackcountrySki',
  Canoeing = 'Canoeing',
  Crossfit = 'Crossfit',
  EBikeRide = 'EBikeRide',
  Elliptical = 'Elliptical',
  Golf = 'Golf',
  Handcycle = 'Handcycle',
  Hike = 'Hike',
  IceSkate = 'IceSkate',
  InlineSkate = 'InlineSkate',
  Kayaking = 'Kayaking',
  Kitesurf = 'Kitesurf',
  NordicSki = 'NordicSki',
  Ride = 'Ride',
  RockClimbing = 'RockClimbing',
  RollerSki = 'RollerSki',
  Rowing = 'Rowing',
  Run = 'Run',
  Sail = 'Sail',
  Skateboard = 'Skateboard',
  Snowboard = 'Snowboard',
  Snowshoe = 'Snowshoe',
  Soccer = 'Soccer',
  StairStepper = 'StairStepper',
  StandUpPaddling = 'StandUpPaddling',
  Surfing = 'Surfing',
  Swim = 'Swim',
  Velomobile = 'Velomobile',
  VirtualRide = 'VirtualRide',
  VirtualRun = 'VirtualRun',
  Walk = 'Walk',
  WeightTraining = 'WeightTraining',
  Wheelchair = 'Wheelchair',
  Windsurf = 'Windsurf',
  Workout = 'Workout',
  Yoga = 'Yoga',
}

export enum MapType {
  Map = 'map',
  Satellite = 'satellite',
  HeatMapLight = 'heat_map_light',
  HeatMapDark = 'heat_map_dark',
}

export enum DistanceUnit {
  Miles = 'mi',
  Kilometers = 'km',
}

export interface IActivitiesCache {
  lastSyncDate?: number;
  activities: Activity[];
}

export type TActivityTypeSettings = Record<ActivityType, {
  color: string,
  hidden: boolean,
}>;
