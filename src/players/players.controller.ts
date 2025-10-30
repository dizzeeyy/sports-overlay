import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { createPlayersDto } from './create-players.dto';
import { CreatePlayersResponseDto } from './create-players-response.dto';
import { UpdatePlayersDto } from './update-players.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return await this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Player> {
    return await this.playersService.findOne(id);
  }

  @Get('lastName/:lastName')
  async findByName(@Param('lastName') name: string): Promise<Player[]> {
    return this.playersService.findByLastName(name);
  }

  @Post('/add')
  async createPlayers(
    @Body() createPlayersDto: createPlayersDto[],
  ): Promise<CreatePlayersResponseDto[]> {
    return await this.playersService.createPlayers(createPlayersDto);
  }

  @Put('update')
  async updatePlayers(
    @Body() updatePlayersDto: UpdatePlayersDto[],
  ): Promise<UpdatePlayersDto[]> {
    return await this.playersService.updatePlayers(updatePlayersDto);
  }
}
