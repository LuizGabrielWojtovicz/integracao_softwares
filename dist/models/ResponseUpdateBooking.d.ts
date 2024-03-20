import { BookDTO } from '../dtos/BookDTO';
export declare class ResponseUpdateBooking {
    message: string;
    booking: BookDTO;
    constructor(booking: BookDTO);
}
