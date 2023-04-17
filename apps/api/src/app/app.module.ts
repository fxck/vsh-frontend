import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

console.log(process.env.DB_CONNECTION_STRING);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_CONNECTION_STRING,
      ssl: false,
      autoLoadEntities: true,
      synchronize: true
    }),
    TodosModule
  ]
})
export class AppModule { }
