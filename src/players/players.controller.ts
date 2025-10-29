import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('lastName/:lastName')
  async findByName(@Param('lastName') name: string): Promise<Player[] | null> {
    return this.playersService.findByName(undefined, name);
  }

  @Post('/add')
  async createPlayers(
    @Body() createPlayersDto: createPlayersDto[],
  ): Promise<CreatePlayersResponseDto[]> {
    return await this.playersService.createPlayers(createPlayersDto);
  }
}
