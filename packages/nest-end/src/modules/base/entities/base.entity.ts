import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import * as dayjs from 'dayjs';
import { RequestContext } from 'nestjs-request-context';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';
import {
  ApiAllProperty,
  ApiCommonProperty,
  ApiProperty,
} from '../dto/ApiProperty';
import { CurrentTime } from 'src/typinng/constans';

export class BaseEntities {
  @PrimaryGeneratedColumn()
  @IsOptional()
  @IsNotEmpty({
    message: 'ID不能为空',
  })
  @IsNumber()
  @ApiAllProperty()
  id: number;

  @ApiCommonProperty()
  @Column({
    name: 'create_time',
    type: 'timestamp',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: string;

  @ApiCommonProperty()
  @Column({
    name: 'update_time',
    comment: '更新时间',
    update: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: string;

  @IsString()
  @ApiCommonProperty()
  @Column({ name: 'create_by', update: false, nullable: true })
  createBy: string;

  @IsString()
  @ApiAllProperty()
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @IsString()
  @ApiCommonProperty()
  @Column({ name: 'update_by', nullable: true })
  updateBy: string;

  @IsString()
  @ApiProperty({
    BaseRequestDto: ['UPDATE', 'CREATE'],
    default: '备注',
    type: String,
    BaseResponseVo: ['PAGE', 'DETAIL', 'ALL', 'CHECK'],
  })
  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: '备注',
    BaseRequestDto: ['UPDATE'],
    BaseResponseVo: ['PAGE', 'CHECK', 'DETAIL', 'ALL'],
  })
  remark?: string;

  @VersionColumn({ select: false, nullable: true })
  version: number;

  @IsNumber()
  @Column('tinyint', {
    name: 'is_delete',
    comment: '是否删除',
  })
  isDelete: number;

  @IsNumber()
  @Column('tinyint', {
    name: 'is_disable',
    comment: '是否禁用',
  })
  isDisable: number;

  @BeforeUpdate()
  public beforeUpdate() {
    const request: Request & { currentUser: User } =
      RequestContext.currentContext.req;
    this.updateTime = CurrentTime;
    this.createBy = request.currentUser.name;
  }
  @BeforeInsert()
  public beforeInsert() {
    const request: Request & { currentUser: User } =
      RequestContext.currentContext.req;
    this.createTime = CurrentTime;
    this.updateTime = CurrentTime;
    this.createBy = request.currentUser.name;
    this.updateBy = request.currentUser.name;
  }
}
