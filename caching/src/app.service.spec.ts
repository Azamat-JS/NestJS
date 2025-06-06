import { Test } from "@nestjs/testing";
import { AppService } from "./app.service"
import { CACHE_MANAGER } from "@nestjs/cache-manager";

const mockCacheManager = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    clear: jest.fn(),
}

describe('AppService', () => {
    let appService: AppService;

    beforeEach(async() => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [],
            providers: [
                AppService,
                {
                    provide: CACHE_MANAGER,
                    useValue: mockCacheManager,
                },
            ]
        }).compile();

        appService = moduleRef.get<AppService>(AppService)
    });
    it('should be defined', () => {
        expect(appService).toBeDefined();
    })
})