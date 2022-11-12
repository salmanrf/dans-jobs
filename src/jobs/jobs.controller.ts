import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard.guard';
import { FindJobsDto } from './dto/find-jobs.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly job_service: JobsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find_jobs(@Query() find_job_dto: FindJobsDto) {
    try {
      const res = await this.job_service.find(find_job_dto);

      return {
        status: 'Success',
        data: res,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get_job(@Param('id') job_id: string) {
    try {
      const res = await this.job_service.get(job_id);

      return {
        status: 'Success',
        data: res,
      };
    } catch (error) {
      return error;
    }
  }
}
