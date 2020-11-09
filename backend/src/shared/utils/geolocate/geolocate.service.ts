import { HttpService, Injectable } from '@nestjs/common';
import { IGeolocateResponse } from './interfaces/GeolocateResponse';

@Injectable()
export class GeolocateService {
  private mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  constructor(private httpService: HttpService) {}

  async geolocate(address: string): Promise<IGeolocateResponse> {
    try {
      const geolocation = await this.httpService
        .get<IGeolocateResponse>(
          `${this.mapboxBaseUrl}/${address}.json?access_token=${process.env.MAPBOX_TOKEN}`,
        )
        .toPromise();

      return geolocation.data;
    } catch (error) {
      throw error;
    }
  }
}
