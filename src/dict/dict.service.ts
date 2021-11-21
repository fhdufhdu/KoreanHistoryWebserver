import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict, DictDocument } from './entities/dict.entity';

@Injectable()
export class DictService {
  constructor(@InjectModel(Dict.name) private readonly dictModel: Model<DictDocument>) { }


  //문서 생성
  async create(createDictDto: CreateDictDto) {
    const createdDict = new this.dictModel(createDictDto);
    return createdDict.save();
  }
  //모든 문서 불러오기 현재 Json형태 그대로 들고옴. -> 추후에 제목만 들고오도록 수정하기
  async findDict(category: string, page: number) {

    const categoryQuery = this.findType(category) //카테고리 가져오기
    const findDict = await this.dictModel.find({ title: categoryQuery }, { _id: true, title: true, intro: true }).sort({ "title": 1 }).skip((page - 1) * 10).limit(10);
    const findDictNumber = await this.dictModel.find({ title: categoryQuery }).count();
    return [findDictNumber, findDict];
  }

  async findOne(query: string) {
    //title에 쿼리의 문자열이 포함되는 모든 문서 ex) title: "title":"김세종(金世宗)", "세종(世宗)" = 쿼리: 세종,
    const findDict = await this.dictModel.find({ title: { $regex: query } }, { _id: true, title: true, intro: true }).limit(10);
    const findDictNumber = await this.dictModel.find({ title: { $regex: query } }).count();
    return [findDictNumber, findDict]

  }

  async findByTitle(title: string) {

    //제목을 이용하여 사용 -> title과 쿼리가 정확히 일치해야 함 ex) title: 세종여자고등학교(世宗女子高等學校) = 쿼리: 세종여자고등학교(世宗女子高等學校)
    return await this.dictModel.findOne({ title: title }).exec();
  }

  //문서 수정
  async update(id: string, updateDictDto: UpdateDictDto) {
    return await this.dictModel.findByIdAndUpdate(id, updateDictDto).exec();
  }
  //문서 삭제
  async remove(id: string) {
    return await this.dictModel.deleteOne({ _id: id }).exec();
  }

  //카테고리 별 쿼리?
  findType(category: string) {
    switch (category) {
      case '가': return /^[ㄱ-ㄲ가-깋]/
      case '나': return /^[ㄴ-ㄴ나-닣]/
      case '다': return /^[ㄷ-ㄸ다-딯]/
      case '라': return /^[ㄹ-ㄹ라-맇]/
      case '마': return /^[ㅁ-ㅁ마-밓]/
      case '바': return /^[ㅂ-ㅃ바-빟]/
      case '사': return /^[ㅅ-ㅆ사-싷]/
      case '아': return /^[ㅇ-ㅇ아-잏]/
      case '자': return /^[ㅈ-ㅉ자-짛]/
      case '차': return /^[ㅊ-ㅊ차-칳]/
      case '카': return /^[ㅋ-ㅋ카-킿]/
      case '타': return /^[ㅌ-ㅌ타-팋]/
      case '파': return /^[ㅍ-ㅍ파-핗]/
      case '하': return /^[ㅎ-ㅎ하-힣]/
      case '기타': return /^[^ㄱ-ㅎ가-힣]/
    }
  }
}
