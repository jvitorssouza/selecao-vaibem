import { Global, HttpModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FilterRequestByUserOrPermissionInterceptor } from './infra/http/middlewares/filter-request-by-user-or-permission.interceptor';
import { GeolocateService } from './utils/geolocate/geolocate.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: FilterRequestByUserOrPermissionInterceptor,
    },
    GeolocateService,
  ],
  exports: [GeolocateService],
})
export class SharedModule {}
