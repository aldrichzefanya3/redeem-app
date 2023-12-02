import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { JWTGuard } from 'src/utils/jwt-guard.util';

import { AwardService } from './award.service';
import { ResponseFormatter } from '../../utils/response.util';

@Controller('/awards/')
export class AwardController {
    constructor(private readonly awardService: AwardService) {}

    @Get()
    @UseGuards(JWTGuard)
    async getAll(@Req() req: Request, @Res() res: Response) {
        try {
            const payload = req.query;

            const result = await this.awardService.getAllAwards(payload);

            return ResponseFormatter.response(result, res);
        } catch (err) {
            Logger.error(err);
            return ResponseFormatter.responseWithErrorMessage(err.response.message, res);
        }
    }
}
