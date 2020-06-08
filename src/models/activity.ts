import type { IStravaActivity } from '~/types';
import { ActivityType } from '~/types';

export default class Activity {
  id: number;

  type: ActivityType;

  name: string;

  startDate: string;

  startLatLng: number[];

  endLatLng: number[];

  polyline: string;

  distance: number;

  movingTime: number;

  constructor({
    id,
    type,
    name,
    start_date: startDate,
    start_latlng: startLatLng,
    end_latlng: endLatLng,
    map: {
      summary_polyline: polyline,
    } = { summary_polyline: '' },
    distance,
    moving_time: movingTime,
  }: IStravaActivity) {
    this.id = id;
    this.type = ActivityType[type as keyof typeof ActivityType];
    this.name = name;
    this.startDate = startDate;
    this.startLatLng = startLatLng;
    this.endLatLng = endLatLng;
    this.polyline = polyline;
    this.distance = distance;
    this.movingTime = movingTime;
  }
}
