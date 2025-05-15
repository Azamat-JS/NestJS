import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class SmsService {
    async sendSMS(phone_number:string){
      const data = new FormData();

      data.append("mobile", '998910928353');
      data.append('message', 'Tasks test');
      data.append('from', '4546');
<<<<<<< HEAD
      data.append("callback_id", `http://0000.uz/test.php`)
=======
>>>>>>> 47cf5a7 (microservice project)


      const config = {
        method:'post',
        maxBodylength: Infinity,
        url: 'https://notifyeskiz.uz.api/message/sms/send',
        headers: {
<<<<<<< HEAD
            Authorization: "Bearer eyPo0984oijklajdsf89078alkj9u823rhjl.h34543sdvddqt4t43bcbvsadf234pkjpifadsf9.kl;jasd00934j34jasdflkj23kljpasdpy",
=======
            Authorization: "Bearer ",
>>>>>>> 47cf5a7 (microservice project)

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
