import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create.todo.dto';
import { UpdateTodoDto } from './dtos/update.todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Body('clientId') clientId: string) {
    return this.todosService.create(clientId, createTodoDto);
  }

  @Get()
  findAll(@Query('clientId') clientId: string) {
    return this.todosService.findAll(clientId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTodoDto) {
    return this.todosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }

  @Patch('markAllAsCompleted')
  markAllAsCompleted(@Query('clientId') clientId: string) {
    return this.todosService.markAllAsCompleted(clientId);
  }

}
