import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './create-sport.dto';
import { Sports } from './sports.entity';
import { UpdateSportDto } from './update-sport.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOAuth2,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SportsDto } from './sports.dto';

@ApiTags('Sports')
@ApiBearerAuth('Authorization in Swagger')
@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all sports',
    description: 'Retrieve a list of all sports',
  })
  @ApiOkResponse({
    description: 'List of sports retrieved successfully',
    type: [SportsDto],
  })
  @ApiNotFoundResponse({
    description: 'No sports found',
  })
  async getAllSports(): Promise<Sports[]> {
    return this.sportsService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({
    summary: 'Get sport by ID',
    description: 'Retrieve a sport details by its unique ID',
  })
  @ApiOkResponse({
    description: 'Sport retrieved successfully',
    type: SportsDto,
  })
  @ApiBadRequestResponse({
    description: 'Sport not found',
  })
  async getSportById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Sports | null> {
    return this.sportsService.findOne(id);
  }

  @Get('name/:name')
  @ApiOperation({
    summary: 'Get sport by name',
    description: 'Retrieve a sport details by its name',
  })
  @ApiOkResponse({
    description: 'Sport retrieved successfully',
    type: SportsDto,
  })
  @ApiNotFoundResponse({
    description: 'Sport not found',
  })
  async getSportByName(@Param('name') name: string): Promise<Sports | null> {
    return this.sportsService.findOneByName(name);
  }

  @Post('add')
  @ApiOperation({
    summary: 'Create a new sport',
    description: 'Create a new sport with the provided details',
  })
  @ApiCreatedResponse({
    description: 'Sport created successfully',
    type: SportsDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  async createSport(@Body() createSportDto: CreateSportDto): Promise<Sports> {
    return this.sportsService.create(createSportDto);
  }

  @Put('update')
  @ApiOperation({
    summary: 'Update an existing sport',
    description: 'Update the details of an existing sport',
  })
  @ApiOkResponse({
    description: 'Sport updated successfully',
    type: SportsDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiNotFoundResponse({
    description: 'Sport not found',
  })
  async updateSportByName(
    @Body() updateSportDto: CreateSportDto,
  ): Promise<Sports> {
    return this.sportsService.updateSport(updateSportDto);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a sport',
    description: 'Delete a sport by its unique ID',
  })
  @ApiNoContentResponse({
    description: 'Sport deleted successfully',
  })
  deleteSport(@Param('id') id: string): Promise<void> {
    return this.sportsService.deleteSport(id);
  }
}
