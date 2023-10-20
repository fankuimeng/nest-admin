import { IsNumber, IsOptional } from 'class-validator';
import * as dayjs from 'dayjs';
import { RequestContext } from 'nestjs-request-context';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntities {
  @PrimaryGeneratedColumn()
  @IsOptional()
  @IsNumber()
  id: number;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: string;

  @Column({
    name: 'update_time',
    comment: '更新时间',
    update: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: string;

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

  // 你可以在实体中定义具有任何名称的方法，并使用@BeforeUpdate标记它，并且 TypeORM 将在使用 repository/manager save更新现有实
  // 体之前调用它。 但请记住，只有在模型中更改信息时才会出现这种情况。
  // 如果运行save而不修改模型中的任何内容，

  @BeforeUpdate()
  public beforeUpdate() {
    const request: Request = RequestContext.currentContext.req;
    this.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.updateBy = request.url + 'mfk';
  }
  @BeforeInsert()
  public beforeInsert() {
    const request: Request = RequestContext.currentContext.req;
    this.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.createBy = 'mfk' + request.referrer;
    this.updateBy = request.url + 'mfk';
  }
}
