import { ApiProperty } from '@nestjs/swagger';
import { IsIP } from 'class-validator';
import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, BeforeUpdate } from 'typeorm';
@Entity()
export class Logger extends BaseEntities {
  // 日志内容
  @Column({ type: 'text', name: 'content', comment: '日志内容' })
  content?: string;

  //  前端路由
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
  @Column({ type: 'varchar', nullable: true, length: 50, comment: '用户名' })
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
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '请求地址',
  })
  api_url: string;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User, {
    cascade: true,
  }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  userInfo: User;
}

// IsOptional 检查给定值是否为空(=== null, === undefined) ，如果是，则忽略属性上所有验证程序
// IsDefined: 检查值是否已定义
// IsString: 检查值是否为字符串
// IsNumber: 检查值是否为数字
// IsBoolean: 检查值是否为布尔值
// IsDate: 检查值是否为日期对象
// IsDateString: 检查值是否为日期字符串
// IsArray: 检查值是否为数组
// IsEnum: 检查值是否为枚举类型
// IsInt: 检查值是否为整数
// IsPositive: 检查值是否为正数
// IsNegative: 检查值是否为负数
// Min: 检查值是否大于等于指定值
// Max: 检查值是否小于等于指定值
// Length: 检查值的长度是否符合指定范围
// IsNotEmpty: 检查值是否非空
// IsEmpty: 检查值是否为空
// IsEmail: 检查值是否为电子邮件地址
// IsUrl: 检查值是否为URL地址
// IsPhoneNumber: 检查值是否为电话号码
// Matches: 检查值是否匹配指定的正则表达式
// IsBooleanString: 检查值是否为布尔字符串
// IsNumberString: 检查值是否为数字字符串
// IsBase64: 检查值是否为Base64字符串
// IsMongoId: 检查值是否为MongoDB的ObjectId字符串
// @IsPostalCode: 检查值是否为邮政编码
// @IsHexColor: 检查值是否为十六进制颜色码
// @IsAlpha: 检查值是否只包含字母
// @IsAlphanumeric: 检查值是否只包含字母和数字
// @IsAscii: 检查值是否只包含ASCII字符
// @IsFullWidth: 检查值是否包含全角字符
// @IsIn(values: any[]) 检查值是否在允许值的数组中
// @MinDate(date: Date) 是否在指定日期之后
// @MaxDate(date: Date) 是否在指定日期之前
// @IsLatitude() 检查字符串或数字是否是有效的纬度坐标
// @IsLongitude() 检查字符串或数字是否为有效的经度坐标
