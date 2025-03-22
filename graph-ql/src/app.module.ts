import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from  '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './graphql/resolvers/user.resolver';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal:true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql'
  })
  ],
  controllers:[],
  providers:[UserResolver]
})
export class AppModule {}
