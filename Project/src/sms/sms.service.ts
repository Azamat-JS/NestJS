import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class SmsService {
    async sendSMS(phone_number:string){
      const data = new FormData();

      data.append("mobile", '998910928353');
      data.append('message', 'Tasks test');
      data.append('from', '4546');


      const config = {
        method:'post',
        maxBodylength: Infinity,
        url: 'https://notifyeskiz.uz.api/message/sms/send',
        headers: {
            Authorization: "Bearer ",

        },
        data:data
      }

      try {
        const response = await axios(config)
        return response
      } catch (error) {
        console.error(error)
      }
    }
}
