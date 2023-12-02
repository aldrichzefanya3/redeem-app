import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import { Award } from '../../entities/award.entity';
import { AwardRepository } from '../../respositories/award.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Award])],
    controllers: [AwardController],
    providers: [AwardService, AwardRepository],
})
export class AwardModule {}
