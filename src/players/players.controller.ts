import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { createPlayersDto } from './create-players.dto';
import { CreatePlayersResponseDto } from './create-players-response.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Post('/add')
  async createPlayers(
    @Body() createPlayersDto: createPlayersDto[],
  ): Promise<CreatePlayersResponseDto[]> {
    return await this.playersService.createPlayers(createPlayersDto);
  }
}
