import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';

import { Award } from 'src/entities/award.entity';

@Injectable()
export class AwardRepository {
    constructor(
        @InjectRepository(Award)
        private readonly awardRepository: Repository<Award>,
    ) {}

    async getAll(payload: any) {
        const match = {};
        const { Page, Limit, Sort, Type, From, To } = payload;

        payload.Sort = Sort ?? 'ASC';
        payload.Limit = Limit ?? 10;
        payload.Page = Page ?? 1;

        const offset = (payload.Page - 1) * payload.Limit;
        const limit = payload.Limit;
        const sort = payload.Sort;

        if (From && To) {
            match['Point'] = Between(From, To);
        }

        if (Type) {
            match['AwardType'] = In(Type);
        }

        try {
            const result = await this.awardRepository.findAndCount({
                where: match,
                order: {
                    CreatedAt: sort,
                },
                skip: offset,
                take: limit,
            });

            return result;
        } catch (err) {
            throw err;
        }
    }
}
