import { AppService } from './app.service';
import { BookDTO } from './dtos/BookDTO';
import { ResponseBookDTO } from './dtos/ResponseBookDTO';
import { Booking } from './models/Booking';
import { ResponseCreateBooking } from './models/ResponseCreateBooking';
import { ResponseUpdateBooking } from './models/ResponseUpdateBooking';
import { ResponseDeleteDTO } from './dtos/ResponseDeleteDTO';
export declare class AppController {
    private booking;
    private readonly appService;
    constructor(booking: typeof Booking, appService: AppService);
    createBooking(postData: BookDTO): Promise<ResponseCreateBooking>;
    getHello(): string;
    insertObject(postData: {
        title: string;
        content?: string;
        authorEmail: string;
    }): {
        result: {
            title: string;
            content: string;
            authorEmail: string;
        };
    };
    private validation;
    private validationIdElement;
    private validationBody;
    insertObjectWithDTO(postData: BookDTO): ResponseBookDTO;
    getBooking(): Promise<Booking[]>;
    getBookingById(id: number): Promise<Booking[]>;
    getBookingByQueryString(id: number): Promise<Booking[]>;
    putBooking(id: number, body: BookDTO): Promise<ResponseUpdateBooking>;
    deleteBooking(id: number): Promise<ResponseDeleteDTO>;
}
