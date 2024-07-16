import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  constructor(
    @Inject('s-scheduler')
    private readonly sScheduler: ClientProxy,
  ) {}

  public getJobs(): Observable<any> {
    return this.sScheduler.send('get-jobs', {});
  }

  public getJobById(id: string): Observable<any> {
    return this.sScheduler.send('get-job-by-id', {
      id,
    });
  }

  public addJobs(body): Observable<any> {
    // Example of sending data to microservice sessions with the label check_health
    // inside queue session
    return this.sScheduler.send('add-jobs', { body });
  }
}
