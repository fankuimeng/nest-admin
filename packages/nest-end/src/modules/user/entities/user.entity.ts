import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
  isString,
} from 'class-validator';
import {
  ApiAllPropert,
  ApiCommonPropert,
  ApiProperty,
  ApiUpdatePropert,
} from 'src/modules/base/dto/ApiProperty';
import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

//  Contains, IsDate, IsEmail, IsFQDN, IsInt, Length, Max, Min;  class-validator

@Entity()
export class User extends BaseEntities {
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @ApiAllPropert({ description: '邮箱' })
  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱号',
    length: 50,
  })
  email?: string | null;

  //电话号码
  @IsPhoneNumber()
  @Column('tinyint', {
    name: 'phone',
    width: 11,
    comment: '手机号',
    nullable: true,
  })
  phone?: string;

  //电话号码
  @Column('int', {
    name: 'login_num',
    comment: '登录次数',
    default: 0,
  })
  loginNum?: number;
  @IsString()
  @IsNotEmpty({
    message: '用户昵称不能为空',
  })
  @Length(50)
  @ApiUpdatePropert()
  @Column('varchar', {
    name: 'nickname',
    nullable: true,
    comment: '用户昵称',
    length: 50,
  })
  nickname?: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码不能少于 6 位',
  })
  @Column('varchar', {
    name: 'password',
    comment: '密码',
    select: false,
    length: 255,
  })
  password?: string;

  @IsString()
  @Length(1024)
  @ApiCommonPropert()
  @Column('varchar', {
    name: 'avatar',
    nullable: true,
    comment: '用户头像',
    length: 1024,
  })
  avatar?: string;

  @ApiCommonPropert()
  @Column('varchar', {
    name: 'login_last_ip',
    nullable: true,
  })
  loginLastIp?: string;

  @ApiCommonPropert()
  @Column({
    type: 'date',
    nullable: true,
    name: 'login_last_time',
  })
  loginLastTime?: Date;

  @ApiCommonPropert()
  @Column('varchar', {
    name: 'info',
    nullable: true,
    comment: '用户简介',
    length: 255,
  })
  info?: string | null;

  @ApiCommonPropert()
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
