import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { createPlayersDto } from './create-players.dto';
import { CreatePlayersResponseDto } from './create-players-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find({ relations: ['team'] });
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  async findByName(name: string): Promise<Player | null> {
    const player = await this.playerRepository.findOne({
      where: { lastName: name },
    });
    return player || null;
  }

  async createPlayers(
    createPlayersDto: createPlayersDto[],
  ): Promise<CreatePlayersResponseDto[]> {
    const players: CreatePlayersResponseDto[] = [];
    for (const playerData of createPlayersDto) {
      const player = await this.findByName(playerData.lastName);
      if (!player) {
        const newPlayer = this.playerRepository.create(playerData);
        await this.playerRepository.save(newPlayer);
        players.push({ ...newPlayer, created: true });
      } else {
        const response = plainToInstance(CreatePlayersResponseDto, {
          ...player,
          created: false,
          message: 'Player already exists',
        });
        players.push(response);
      }
    }
    return players;
  }
}
