import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Equal } from 'typeorm';

import { ErrorMessage } from '../../enums/error-message.enum';
import { UserRepository } from '../../respositories/users.repository';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

    async signIn(payload: any) {
        const user = await this.validateUser(payload);

        return user;
    }

    async validateUser(payload: any) {
        const { Email } = payload;

        const condition = {
            Email: Equal(Email),
        };

        const user = await this.userRepository.getOne(condition);

        if (!user) {
            throw new BadRequestException(ErrorMessage.EMAIL_ADDRESS_IS_NOT_EXISTS);
        }

        const jwtPayload = {
            sub: user.ID,
            fullname: user.FullName,
        };

        return {
            AccessToken: await this.jwtService.sign(jwtPayload, { secret: process.env.JWT_SECRET_KEY }),
        };
    }
}
