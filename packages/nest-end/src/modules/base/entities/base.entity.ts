import { IsNumber, IsOptional } from 'class-validator';
import { RequestContext } from 'nestjs-request-context';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntities {
  @PrimaryGeneratedColumn()
  @IsOptional()
  @IsNumber()
  id: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({ name: 'create_by', update: false, nullable: true })
  createBy?: string;

  @Column({ name: 'update_by', nullable: true })
  updateBy?: string;

  @Column({ type: 'varchar', nullable: true })
  remark?: string | undefined | null;

  @VersionColumn({ select: false, nullable: true })
  version?: number;

  @Column({
    name: 'is_delete',
    comment: '是否删除',
    nullable: true,
    default: 0,
  })
  isDelete?: number;

  @BeforeUpdate()
  public beforeUpdate(...args) {
    const request: Request = RequestContext.currentContext.req;
    this.updateBy = request.url + 'mfk';
  }

  @BeforeInsert()
  public beforeInsert(...args) {
    const request: Request = RequestContext.currentContext.req;
    this.createBy = 'mfk' + request.referrer;
  }
}
