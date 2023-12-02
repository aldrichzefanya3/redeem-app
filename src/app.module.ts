import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './databases/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AwardModule } from './modules/award/award.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: false,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: '3600s',
            },
        }),
        DatabaseModule,
        AuthModule,
        AwardModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
