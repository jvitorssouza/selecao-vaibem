import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Establishment } from '../infra/typeorm/entities/Establishment';
import { IFindAllEntity } from '@shared/infra/database/interfaces/FindAllEntity';
import { GeolocateService } from '@shared/utils/geolocate/geolocate.service';

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepo: Repository<Establishment>,
    private readonly geolocateService: GeolocateService,
  ) {}

  async find({
    page,
    limit,
    filter,
  }: IFindAllEntity<Establishment>): Promise<
    Establishment[] | [Establishment[], number]
  > {
    try {
      let establishments: Establishment[] | [Establishment[], number];

      if (page && limit) {
        establishments = await this.establishmentRepo.findAndCount({
          where: {
            ...filter,
          },
          skip: (page - 1) * limit,
          take: limit,
          order: {
            id: 'ASC',
          },
        });
      }

      if (!page || !limit) {
        establishments = await this.establishmentRepo.find({
          where: { ...filter },
          order: {
            id: 'ASC',
          },
        });
      }

      return establishments;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Establishment> {
    try {
      const establishment = await this.establishmentRepo.findOne(id);

      if (!establishment) {
        throw new NotFoundException('Estabelecimento não encontrado!');
      }

      return establishment;
    } catch (error) {
      throw error;
    }
  }

  async create(data: Partial<Establishment>): Promise<Establishment> {
    try {
      const geolocation = await this.geolocateService.geolocate(
        `${data?.addressStreet}, ${data?.addressNumber}, ${data?.neighboorhood}, ${data?.city}, ${data?.state} - ${data?.zipCode}`,
      );

      const dataCreate: Partial<Establishment> = {
        ...data,
        long: geolocation.features[0].geometry.coordinates[0],
        lat: geolocation.features[0].geometry.coordinates[1],
      };

      const create = await this.establishmentRepo.create(dataCreate);
      const establishment = await this.establishmentRepo.save(create);

      return establishment;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    data: Partial<Establishment>,
  ): Promise<Establishment> {
    try {
      const establishment = await this.establishmentRepo.findOne(id);

      let saveEstablishment = {
        ...establishment,
        ...data,
      };

      if (
        data.addressStreet !== establishment.addressStreet ||
        data.neighboorhood !== establishment.neighboorhood ||
        data.state !== establishment.state
      ) {
        const geolocation = await this.geolocateService.geolocate(
          `${data?.addressStreet}, ${data?.addressNumber}, ${data?.neighboorhood}, ${data?.city}, ${data?.state} - ${data?.zipCode}`,
        );

        saveEstablishment = {
          ...saveEstablishment,
          long: geolocation.features[0].geometry.coordinates[0],
          lat: geolocation.features[0].geometry.coordinates[1],
        };
      }

      const updated = await this.establishmentRepo.save(saveEstablishment);

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: number): Promise<Establishment> {
    try {
      const establishment = await this.establishmentRepo.findOne(id);

      if (!establishment) {
        throw new NotFoundException('Estabelecimento não encontrado!');
      }

      await this.establishmentRepo.delete({
        id,
      });

      return establishment;
    } catch (error) {
      throw error;
    }
  }
}
