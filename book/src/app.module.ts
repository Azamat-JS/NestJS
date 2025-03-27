import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './books/entities/book.entity';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal:true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql',
    debug:true,
    playground:true
  }),
  TypeOrmModule.forRoot({
    type: 'postgres', 
    host: 'localhost',
    port: 5432, 
    username: 'postgres',
    password: 'azamat998877',
    database: 'library',
    autoLoadEntities: true,
    synchronize: true,
    entities:[BookEntity]
  }),
    BooksModule,
    CategoryModule,
    PurchaseModule,
    RecommendationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
