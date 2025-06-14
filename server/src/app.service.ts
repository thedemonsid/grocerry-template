import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async testDB(): Promise<boolean> {
    try {
      await this.prisma.client.category.findFirst();
      return true;
    } catch (e) {
      console.error('DB Test Failed:', e);
      return false;
    }
  }
}
