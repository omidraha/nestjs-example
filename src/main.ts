import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();


// Ensure environment variables are set
// process.env.DO_NOT_TRACK = process.env.DO_NOT_TRACK || 'true';
// process.env.BOXYHQ_NO_ANALYTICS = process.env.BOXYHQ_NO_ANALYTICS || 'true';

console.log('DO_NOT_TRACK:', process.env.DO_NOT_TRACK);  // Should log "1"
console.log('BOXYHQ_NO_ANALYTICS:', process.env.BOXYHQ_NO_ANALYTICS);  // Should log "1"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
