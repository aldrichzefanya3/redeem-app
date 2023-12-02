import { Injectable } from '@nestjs/common';

import { AwardRepository } from 'src/respositories/award.repository';

@Injectable()
export class AwardService {
    constructor(private readonly awardRepository: AwardRepository) {}

    async getAllAwards(payload: any) {
        const { Page, Limit } = payload;

        payload.Limit = Limit ?? 10;
        payload.Page = Page ?? 1;

        const [result, count] = await this.awardRepository.getAll(payload);

        const pagination = {
            Data: result,
            CurrentPage: payload.Page,
            LastPage: Math.ceil(count / payload.Limit),
            Limit: payload.Limit,
            Total: count,
        };

        return pagination;
    }
}
