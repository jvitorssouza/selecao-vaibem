import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { decode } from 'jsonwebtoken';

@Injectable()
export class FilterRequestByUserOrPermissionInterceptor
  implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const header = context.switchToHttp().getRequest().headers['authorization'];

    if (header) {
      const [, token] = header.split('Bearer ');
      const decoded: any = decode(token);

      if (decoded && decoded.user) {
        const permissions: any[] = decoded.permissions.map(
          (item: any) => item.permission.slug,
        );

        const request = context.switchToHttp().getRequest();

        const reqUrl = request.route.path;

        if (!request.query.filter) {
          request.query.filter = {};
        }

        if (reqUrl.includes('establishments')) {
          if (!permissions.includes('establishments.view.all')) {
            request.query.filter.ownerUserId = decoded.user.id;
          }
        }

        if (reqUrl.includes('notifications')) {
          request.query.filter.userId = decoded.user.id;
        }
      }
    }

    return next.handle().pipe();
  }
}
