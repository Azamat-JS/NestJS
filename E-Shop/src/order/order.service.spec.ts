import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Product } from '../schemas/product.schema';

const mockProductModel = {
  findById: jest.fn(),
};

const mockOrderModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  populate: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  save: jest.fn(),
};

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getModelToken(Product.name), useValue: mockProductModel },
        { provide: getModelToken(Order.name), useValue: mockOrderModel },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const userId = 'userId';
      const products = [{ productId: 'productId', quantity: 2 }];
      const productDoc = { _id: 'productId', price: 50 };

      mockProductModel.findById.mockResolvedValue(productDoc);
      mockOrderModel.save.mockResolvedValue({});

      mockOrderModel.constructor = jest.fn().mockImplementation((data) => ({
        ...data,
        save: jest.fn().mockResolvedValue(data),
      }));

      const result = await service.createOrder(userId, products);
      expect(result.user).toBe(userId);
      expect(result.products[0].price).toBe(50);
      expect(result.totalPrice).toBe(100);
    });
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      mockOrderModel.find.mockReturnThis();
      mockOrderModel.populate.mockReturnThis();
      mockOrderModel.exec.mockResolvedValue([{ id: '1' }]);
      const result = await service.getAllOrders();
      expect(result).toEqual([{ id: '1' }]);
    });
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      mockOrderModel.findById.mockReturnThis();
      mockOrderModel.populate.mockReturnThis();
      mockOrderModel.exec.mockResolvedValue({ id: 'orderId' });
      const result = await service.getOrderById('orderId');
      expect(result).toEqual({ id: 'orderId' });
    });

    it('should throw if order not found', async () => {
      mockOrderModel.findById.mockReturnThis();
      mockOrderModel.populate.mockReturnThis();
      mockOrderModel.exec.mockResolvedValue(null);

      await expect(service.getOrderById('invalidId')).rejects.toThrow();
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order by id', async () => {
      mockOrderModel.findByIdAndDelete.mockResolvedValue({ id: 'orderId' });
      const result = await service.deleteOrder('orderId');
      expect(result).toBe('Order with id: orderId deleted successfully');
    });

    it('should throw if order not found', async () => {
      mockOrderModel.findByIdAndDelete.mockResolvedValue(null);
      await expect(service.deleteOrder('invalidId')).rejects.toThrow();
    });
  });
});
