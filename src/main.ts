import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    });
    const app = await NestFactory.create(AppModule);

    const port = process.env.PORT;

    app.setGlobalPrefix('api/v1');

    app.enableCors({
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    await app.listen(port);
}
bootstrap();
