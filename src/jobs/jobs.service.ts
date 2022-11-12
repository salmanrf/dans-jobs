import { Injectable } from '@nestjs/common';
import { FindJobsDto } from './dto/find-jobs.dto';
const axios = require('axios');

@Injectable()
export class JobsService {
  async find(dto: FindJobsDto) {
    try {
      const { page = 1 } = dto;

      const res = await axios({
        method: 'GET',
        url: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
        params: {
          ...dto,
        },
      });

      const { data } = res;

      const result = {
        page: +page,
        items: data,
      };

      return result;
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  }

  async get(job_id: string) {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://dev3.dansmultipro.co.id/api/recruitment/positions/${job_id}`,
      });

      const { data } = res;

      return data;
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  }
}
