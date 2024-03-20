import { Booking } from './models/Booking';
import { BookDTO } from './dtos/BookDTO';
export declare class AppService {
    private booking;
    constructor(booking: typeof Booking);
    getHello(): string;
    createBooking(postData: BookDTO): void;
    putBooking(id: number, putData: BookDTO): Promise<Booking>;
    deleteBooking(id: number): Promise<void>;
}
