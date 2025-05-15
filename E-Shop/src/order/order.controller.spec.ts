import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtGuard } from '../Guards/jwt.guard';
import { AdminGuard } from '../Guards/admin.guard';
import { ExecutionContext } from '@nestjs/common';

const mockOrderService = {
  createOrder: jest.fn(),
  getAllOrders: jest.fn(),
  getOrderById: jest.fn(),
  deleteOrder: jest.fn(),
};

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: (context: ExecutionContext) => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: (context: ExecutionContext) => true })
      .compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const dto = { userId: 'user123', products: [{ productId: 'prod1', quantity: 2 }] };
      const order = { id: 'order1', ...dto };
      mockOrderService.createOrder.mockResolvedValue(order);

      const result = await controller.createOrder(dto);

      expect(result).toEqual(order);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(dto.userId, dto.products);
    });
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      const orders = [{ id: '1' }, { id: '2' }];
      mockOrderService.getAllOrders.mockResolvedValue(orders);

      const result = await controller.getAllOrders();

      expect(result).toEqual(orders);
      expect(mockOrderService.getAllOrders).toHaveBeenCalled();
    });
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      const order = { id: 'orderId' };
      mockOrderService.getOrderById.mockResolvedValue(order);

      const result = await controller.getOrderById('orderId');

      expect(result).toEqual(order);
      expect(mockOrderService.getOrderById).toHaveBeenCalledWith('orderId');
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order by id', async () => {
      const message = 'Order with id: orderId deleted successfully';
      mockOrderService.deleteOrder.mockResolvedValue(message);

      const result = await controller.deleteOrder('orderId');

      expect(result).toBe(message);
      expect(mockOrderService.deleteOrder).toHaveBeenCalledWith('orderId');
    });
  });
});
