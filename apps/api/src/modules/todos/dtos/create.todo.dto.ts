import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'The text of the todo item' })
  @IsString()
  readonly text: string;

  @ApiProperty({ description: 'The completion status of the todo item', default: false })
  @IsBoolean()
  readonly completed: boolean;
}

export class CreateTodoWithClientIdDto extends CreateTodoDto {
  @ApiProperty({ description: 'Unique clientId, use your initials' })
  @IsString()
  clientId: string;
}
