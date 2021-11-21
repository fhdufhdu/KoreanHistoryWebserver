import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>) { }

  async create(createQuizDto: CreateQuizDto) {
    const createdQuiz = new this.quizModel(createQuizDto);
    return createdQuiz.save();
  }
  async findRandom() {
    return await this.quizModel.aggregate([{ $sample: { size: 10 } }],).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    return await this.quizModel.findByIdAndUpdate(id, updateQuizDto).exec();
  }

  async remove(id: string) {
    return await this.quizModel.deleteOne({ _id: id }).exec();
  }
}
