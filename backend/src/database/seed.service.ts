import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async seedStudents() {
    const count = await this.studentRepository.count();
    if (count > 0) {
      console.log('Students table already has data. Skipping seed.');
      return;
    }

    const csvFilePath = path.join(__dirname, '../../../dataset/diem_thi_thpt_2024.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
    
    const validRecords = records.filter((record: any) => record.sbd).map((record: any) => ({
      sbd: record.sbd,
      toan: record.toan ? parseFloat(record.toan) : null,
      ngu_van: record.ngu_van ? parseFloat(record.ngu_van) : null,
      ngoai_ngu: record.ngoai_ngu ? parseFloat(record.ngoai_ngu) : null,
      vat_li: record.vat_li ? parseFloat(record.vat_li) : null,
      hoa_hoc: record.hoa_hoc ? parseFloat(record.hoa_hoc) : null,
      sinh_hoc: record.sinh_hoc ? parseFloat(record.sinh_hoc) : null,
      lich_su: record.lich_su ? parseFloat(record.lich_su) : null,
      dia_li: record.dia_li ? parseFloat(record.dia_li) : null,
      gdcd: record.gdcd ? parseFloat(record.gdcd) : null,
      ma_ngoai_ngu: record.ma_ngoai_ngu || null,
    }));
    console.log(`Found ${validRecords.length} valid records to insert`);
    
    const batchSize = 1000;
    for (let i = 0; i < validRecords.length; i += batchSize) {
      const batch = validRecords.slice(i, i + batchSize) as Student[];
      await this.studentRepository.save(batch);
    }
  }
}
