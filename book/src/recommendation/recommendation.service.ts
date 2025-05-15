import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RecommendationService {
  constructor(private readonly httpService: HttpService) {}

  async getMLRecommendations(bookId: number): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:5000/recommend', { bookId })
    );
    return response.data;
  }
}
