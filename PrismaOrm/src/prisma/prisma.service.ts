import {Injectable, OnModuleInit} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
        this.$connect()
            .then(() => {
                console.log('Connected to the database');
            })
            .catch((error) => {
                console.error('Error connecting to the database:', error);
            });
    }

}