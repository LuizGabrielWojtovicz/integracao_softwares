import { Controller, Get, Body, Post, Param, Query, HttpException, HttpStatus, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { BookDTO } from './dtos/BookDTO';
import { ResponseBookDTO } from './dtos/ResponseBookDTO';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './models/Booking';
import { ResponseCreateBooking } from './models/ResponseCreateBooking';
import { ResponseUpdateBooking } from './models/ResponseUpdateBooking';
import { ResponseDeleteDTO } from './dtos/ResponseDeleteDTO';

 
@Controller()
export class AppController {
  constructor(
    @InjectModel(Booking)
    private booking: typeof Booking,
    private readonly appService: AppService,
  ) {}

  @Post('/booking')
  async createBooking(
    @Body() postData: BookDTO,
  ): Promise<ResponseCreateBooking> {
    this.booking.create({
      title: postData.title,
      content: postData.content,
      authorEmail: postData.authorEmail,
    });

    return new ResponseCreateBooking('the insert was successfulll', postData);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/insert-object')
  insertObject(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ) {
    const { title, content, authorEmail } = postData;

    return {
      result: {
        title,
        content,
        authorEmail,
      },
    };
  }

  private validation(
    id: number,
    body: BookDTO
  ) {
    this.validationIdElement(id)
    this.validationBody(body)
  }

  private validationIdElement(id: number) {
    if(!id) {
      throw new HttpException(
        'Server Error - id Request not found', 
        HttpStatus.BAD_REQUEST
      )
    }
  }

  private validationBody(body: BookDTO) {
    if (!Object.keys(body).length) {
      throw new HttpException(
        'Server Error - Body Request not found', 
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('/insert-object-with-dto')
  insertObjectWithDTO(@Body() postData: BookDTO): ResponseBookDTO {
    const responseBookDTO = new ResponseBookDTO();

    responseBookDTO.result = postData;

    return responseBookDTO;
  }

  @Get('/booking')
  async getBooking(): Promise<Booking[]> {
    return this.booking.findAll();
  }

  @Get('/booking/:id')
  async getBookingById(@Param('id') id: number): Promise<Booking[]> {
    return this.booking.findAll({
      where: {
        id,
      },
    });
  }

  @Get('/booking-querystring')
  async getBookingByQueryString(@Query('id') id: number): Promise<Booking[]> {
    return this.booking.findAll({
      where: {
        id,
      },
    });
  }

  @Put('/booking')
  async putBooking(
    @Query('id') id: number,
    @Body() body: BookDTO,
  ) : Promise<ResponseUpdateBooking> {
    this.validation(id, body);

    return new ResponseUpdateBooking(
      await this.appService.putBooking(id, body)
    ); 
  }

  @Delete('/booking')
  async deleteBooking(
    @Query('id') id: number,
  ) : Promise<ResponseDeleteDTO> {
    this.validationIdElement(id);
    this.appService.deleteBooking(id);

    return new ResponseDeleteDTO();
  }
}


