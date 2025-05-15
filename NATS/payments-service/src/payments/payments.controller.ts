import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, EventPattern, Payload } from "@nestjs/microservices";
import { CreatePaymentDto } from "./dto/create.payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsMicroserviceController {
  constructor(
    @Inject("NATS_SERVICE") private natsClient: ClientProxy,
    private paymentService: PaymentsService
  ) {}
  @EventPattern("createPayment")
  async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    console.log(createPaymentDto);
    const newPayment =
      await this.paymentService.createPayment(createPaymentDto);
    if (newPayment) {
      this.natsClient.emit("paymentCreated", createPaymentDto);
    }
    return null;
  }
}
