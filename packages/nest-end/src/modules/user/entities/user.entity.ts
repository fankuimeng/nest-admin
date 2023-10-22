import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Role } from './role.entity';

//  Contains, IsDate, IsEmail, IsFQDN, IsInt, Length, Max, Min;  class-validator
@Entity()
export class User extends BaseEntities {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '不是合法的邮箱格式',
    },
  )
  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱号',
    length: 50,
  })
  email: string | null;

  //电话号码
  @Column('tinyint', {
    name: 'phone',
    width: 11,
    comment: '手机号',
    nullable: true,
  })
  phone?: string;

  @IsNotEmpty({
    message: '昵称不能为空',
  })
  @Column('varchar', {
    name: 'nickname',
    nullable: true,
    comment: '用户昵称',
    length: 50,
  })
  nickname: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码不能少于 6 位',
  })
  @Column('varchar', {
    name: 'password',
    comment: '密码',
    length: 255,
    select: false,
  })
  password?: string;

  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '用户头像',
    length: 1024,
  })
  avatar: string;

  @Column('varchar', {
    name: 'info',
    nullable: true,
    comment: '用户简介',
    length: 255,
  })
  info: string | null;

  @Column('tinyint', {
    comment: '是否是管理员',
    default: 0,
    name: 'is_admin',
  })
  isAdmin?: number;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
  })
  roles?: Role[];
}
