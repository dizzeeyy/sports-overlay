import { ApiProperty } from '@nestjs/swagger';
import { TeamsCreateDto } from 'src/teams/teams-create.dto';

export class SportsDto {
  @ApiProperty({ example: 'uuid-123', description: 'Sport unique identifier' })
  id: string;

  @ApiProperty({ example: 'Basketball', description: 'Name of the sport' })
  name: string;

  @ApiProperty({ example: 'https://icons.com/nba-icon.png', required: false })
  icon?: string;

  @ApiProperty({ example: 'Popular worldwide', required: false })
  description?: string;

  @ApiProperty({
    type: () => [TeamsCreateDto],
    description: 'Teams playing this sport',
  })
  teams: TeamsCreateDto[];
}
