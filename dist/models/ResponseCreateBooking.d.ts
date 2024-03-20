import { BookDTO } from '../dtos/BookDTO';
export declare class ResponseCreateBooking {
    message: string;
    booking: BookDTO;
    constructor(message: any, booking: BookDTO);
}
