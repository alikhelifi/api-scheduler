import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('jobs')
  public getJobs(): Observable<any> {
    return this.appService.getJobs();
  }
  @Get('job/:id')
  public getJobById(@Param() param: any): Observable<any> {
    const { id } = param;
    return this.appService.getJobById(id);
  }
  @Post('jobs')
  public addJobs(@Body() body: any): Observable<any> {
    return this.appService.addJobs(body);
  }
}
