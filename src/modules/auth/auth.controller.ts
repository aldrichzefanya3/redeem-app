import { Controller, Logger, Post, Req, Res, UnprocessableEntityException } from '@nestjs/common';
import { Request, Response } from 'express';

import { ResponseFormatter } from 'src/utils/response.util';

import { AuthService } from './auth.service';
import { signInModel } from './auth.model';

@Controller('/auth/')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    async signIn(@Req() req: Request, @Res() res: Response) {
        try {
            const payload = req.body;

            const validation = signInModel.validate(payload);
            if (validation.error) {
                const errMsg = validation.error.message;
                throw new UnprocessableEntityException(errMsg);
            }

            const result = await this.authService.signIn(payload);

            return ResponseFormatter.response(result, res);
        } catch (err) {
            Logger.error(err);
            return ResponseFormatter.responseWithErrorMessage(err.response.message, res);
        }
    }
}
