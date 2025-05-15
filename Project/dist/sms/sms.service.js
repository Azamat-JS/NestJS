"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let SmsService = class SmsService {
    async sendSMS(phone_number) {
        const data = new FormData();
        data.append("mobile", '998910928353');
        data.append('message', 'Tasks test');
        data.append('from', '4546');
<<<<<<< HEAD
        data.append("callback_id", `http://0000.uz/test.php`);
=======
>>>>>>> 47cf5a7 (microservice project)
        const config = {
            method: 'post',
            maxBodylength: Infinity,
            url: 'https://notifyeskiz.uz.api/message/sms/send',
            headers: {
<<<<<<< HEAD
                Authorization: "Bearer eyPo0984oijklajdsf89078alkj9u823rhjl.h34543sdvddqt4t43bcbvsadf234pkjpifadsf9.kl;jasd00934j34jasdflkj23kljpasdpy",
=======
                Authorization: "Bearer ",
>>>>>>> 47cf5a7 (microservice project)
            },
            data: data
        };
        try {
            const response = await (0, axios_1.default)(config);
            return response;
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)()
], SmsService);
//# sourceMappingURL=sms.service.js.map