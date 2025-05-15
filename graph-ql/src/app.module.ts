import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from  '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


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
    database: 'graph',
    autoLoadEntities: true,
    synchronize: true,
  }),
  AuthModule
  ],
  controllers:[],
  providers:[],
})
export class AppModule {}
