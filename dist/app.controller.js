"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const BookDTO_1 = require("./dtos/BookDTO");
const ResponseBookDTO_1 = require("./dtos/ResponseBookDTO");
const sequelize_1 = require("@nestjs/sequelize");
const Booking_1 = require("./models/Booking");
const ResponseCreateBooking_1 = require("./models/ResponseCreateBooking");
const ResponseUpdateBooking_1 = require("./models/ResponseUpdateBooking");
const ResponseDeleteDTO_1 = require("./dtos/ResponseDeleteDTO");
let AppController = class AppController {
    constructor(booking, appService) {
        this.booking = booking;
        this.appService = appService;
    }
    async createBooking(postData) {
        this.booking.create({
            title: postData.title,
            content: postData.content,
            authorEmail: postData.authorEmail,
        });
        return new ResponseCreateBooking_1.ResponseCreateBooking('the insert was successfulll', postData);
    }
    getHello() {
        return this.appService.getHello();
    }
    insertObject(postData) {
        const { title, content, authorEmail } = postData;
        return {
            result: {
                title,
                content,
                authorEmail,
            },
        };
    }
    validation(id, body) {
        this.validationIdElement(id);
        this.validationBody(body);
    }
    validationIdElement(id) {
        if (!id) {
            throw new common_1.HttpException('Server Error - id Request not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    validationBody(body) {
        if (!Object.keys(body).length) {
            throw new common_1.HttpException('Server Error - Body Request not found', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    insertObjectWithDTO(postData) {
        const responseBookDTO = new ResponseBookDTO_1.ResponseBookDTO();
        responseBookDTO.result = postData;
        return responseBookDTO;
    }
    async getBooking() {
        return this.booking.findAll();
    }
    async getBookingById(id) {
        return this.booking.findAll({
            where: {
                id,
            },
        });
    }
    async getBookingByQueryString(id) {
        return this.booking.findAll({
            where: {
                id,
            },
        });
    }
    async putBooking(id, body) {
        this.validation(id, body);
        return new ResponseUpdateBooking_1.ResponseUpdateBooking(await this.appService.putBooking(id, body));
    }
    async deleteBooking(id) {
        this.validationIdElement(id);
        this.appService.deleteBooking(id);
        return new ResponseDeleteDTO_1.ResponseDeleteDTO();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('/booking'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookDTO_1.BookDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('/insert-object'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "insertObject", null);
__decorate([
    (0, common_1.Post)('/insert-object-with-dto'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BookDTO_1.BookDTO]),
    __metadata("design:returntype", ResponseBookDTO_1.ResponseBookDTO)
], AppController.prototype, "insertObjectWithDTO", null);
__decorate([
    (0, common_1.Get)('/booking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBooking", null);
__decorate([
    (0, common_1.Get)('/booking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBookingById", null);
__decorate([
    (0, common_1.Get)('/booking-querystring'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBookingByQueryString", null);
__decorate([
    (0, common_1.Put)('/booking'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, BookDTO_1.BookDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "putBooking", null);
__decorate([
    (0, common_1.Delete)('/booking'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteBooking", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, sequelize_1.InjectModel)(Booking_1.Booking)),
    __metadata("design:paramtypes", [Object, app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map