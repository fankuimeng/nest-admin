import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsUUID } from 'class-validator';
import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';

export class Logs extends BaseEntities {
  // 日志内容

  @Column('text', { name: '日志内容' })
  content!: string;

  // 前端路由
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '前端路由',
  })
  ip: string;

  @IsIP()
  @Column({ type: 'varchar', length: 50, nullable: false, comment: 'ip' })
  path: string;

  @ApiProperty({
    type: String,
    description: '用户名称',
    default: 'admin',
    required: false,
  })
  @Column({ type: 'varchar', length: 50, comment: '用户名' })
  user_name?: string;

  // 代理
  @Column({ type: 'varchar', nullable: false, comment: '代理' })
  user_agent: string;

  // 请求参数
  @Column({ type: 'json', nullable: false, comment: '请求参数' })
  params: Record<string, any>;

  // 请求方式
  @Column({ type: 'varchar', length: 20, nullable: false, comment: '请求方式' })
  method: RequestMode | string;

  // 请求地址
  @Column({ type: 'varchar', length: 20, nullable: false, comment: '请求地址' })
  api_url: string;

  @ManyToOne(() => User, {
    cascade: true,
  }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  userInfo: User;
}
