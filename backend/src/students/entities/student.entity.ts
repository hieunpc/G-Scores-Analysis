import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryColumn({ type: 'varchar', length: 8 })
  sbd: string;

  @Index('idx_toan')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  toan: number | null;

  @Index('idx_ngu_van')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  ngu_van: number | null;

  @Index('idx_ngoai_ngu')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  ngoai_ngu: number | null;

  @Index('idx_vat_li')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  vat_li: number | null;

  @Index('idx_hoa_hoc')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  hoa_hoc: number | null;

  @Index('idx_sinh_hoc')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  sinh_hoc: number | null;

  @Index('idx_lich_su')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  lich_su: number | null;

  @Index('idx_dia_li')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  dia_li: number | null;

  @Index('idx_gdcd')
  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  gdcd: number | null;

  @Column({ type: 'varchar', length: 2, nullable: true })
  ma_ngoai_ngu: string | null;
}
