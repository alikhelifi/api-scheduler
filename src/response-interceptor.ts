import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map(
        (resp: {
          error?: boolean;
          status?: number;
          statusCode?: number;
          message?: string;
          data?: unknown;
        }) => {
          const ctx = context.switchToHttp();
          const response = ctx.getResponse();
          if (resp && resp.error) {
            return response.status(resp.status).json({
              success: false,
              statusCode: resp.status,
              message: resp.message,
              timestamp: new Date().getTime(),
            });
          }
          return resp;
        },
      ),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException | any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.status
          ? exception.status
          : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      success: false,
      statusCode: status,
      message: exception?.response
        ? exception?.response.message
        : exception.message,
      timestamp: new Date().getTime(),
    });
  }
}
