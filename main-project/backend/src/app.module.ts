import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { ProductsModule } from './apis/products/products.module';
import { UsersMoudule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { PaymentsModule } from './apis/payments/payments.module';
import { ProductOrdersModule } from './apis/productOders/productOrders.module';
import { IamportModule } from './apis/iamport/import.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    PaymentsModule,
    ProductOrdersModule,
    IamportModule,
    UsersMoudule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
