import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorsModule } from './authors/authors.module';
import { NotificationModule } from './notification/notification.module';
import { RewiewModule } from './rewiew/rewiew.module';
import { PublisherModule } from './publisher/publisher.module';
import { UserModule } from './user/user.module';
import { FavoritebookModule } from './favoritebook/favoritebook.module';
import { BookModule } from './book/book.module';
import { BookpublisherModule } from './bookpublisher/bookpublisher.module';
import { AudiobookModule } from './audiobook/audiobook.module';
import { AudiovoiceModule } from './audiovoice/audiovoice.module';
import { SavolModule } from './savol/savol.module';
import { QuizModule } from './quiz/quiz.module';
import { GenreModule } from './genre/genre.module';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { Author } from './authors/models/author.model';
import { Notification } from './notification/models/notification.model';
import { Rewiew } from './rewiew/models/rewiew.model';
import { Publisher } from './publisher/models/publisher.model';
import { User } from './user/models/user.model';
import { Favoritebook } from './favoritebook/models/favoritebook.model';
import { Book } from './book/models/book.model';
import { Admin } from './admin/models/admin.model';
import { Audiobook } from './audiobook/models/audiobook.model';
import { Audiovoice } from './audiovoice/models/audiovoice.model';
import { Bookpublisher } from './bookpublisher/models/bookpublisher.model';
import { Genre } from './genre/models/genre.model';
import { Quiz } from './quiz/models/quiz.model';
import { Savol } from './savol/models/savol.model';
import { Category } from './category/models/category.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Audiobook,
        Audiovoice,
        Author,
        Book,
        Bookpublisher,
        Category,
        Favoritebook,
        Genre,
        Notification,
        Publisher,
        Quiz,
        Rewiew,
        Savol,
        User,
      
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
      synchronize: true,
    }),

    AdminModule,
    AudiobookModule,
    AudiovoiceModule,
    AuthorsModule,
    BookModule,
    BookpublisherModule,
    CategoryModule,
    FavoritebookModule,
    GenreModule,
    NotificationModule,
    PublisherModule,
    QuizModule,
    RewiewModule,
    SavolModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
