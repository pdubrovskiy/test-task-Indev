import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function start() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const PORT = process.env.PORT || 5000;

  await app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`);
  });
}
start();
