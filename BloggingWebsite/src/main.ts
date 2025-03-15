import {NestFactory} from '@nestjs/core'
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config'
import { AllExceptionFilter } from 'filter/all-exception.filter';

async function bootstrap(){
    try {
        const app = await NestFactory.create(AppModule)

        const configuration = new DocumentBuilder()
        .setTitle("My NestJS API")
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('tasks')
        .build();

        const document = SwaggerModule.createDocument(app, configuration);
        SwaggerModule.setup('api', app, document);

          app.useGlobalFilters(new AllExceptionFilter());
          
        const PORT = config.get<number>('PORT')
        app.listen(PORT, () => {
            console.log('server running on: http://localhost:' + PORT);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

bootstrap()