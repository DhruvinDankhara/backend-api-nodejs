import {
    Injectable,
  } from '@nestjs/common';
import { handleError, createHash, match } from './../../utils/utils';
  import { ConfigService } from 'src/config/config.service';
import { CategoryRepository } from '../../shared/repository';
  
  @Injectable()
  export class CategoryService {

    constructor(private readonly configService: ConfigService,
        private readonly categoryRepo: CategoryRepository
    ){ }

    public async getAll(name:string): Promise<any> {
        try {
          return await this.categoryRepo.findAll({query: name});
        } catch (e) {
          handleError(e);
        }
      }
  }
  