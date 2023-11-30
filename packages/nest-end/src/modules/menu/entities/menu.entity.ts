import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  ApiAllProperty,
  ApiCommonProperty,
  ApiUpdateProperty,
} from 'src/modules/base/dto/ApiProperty';
import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { Permission } from 'src/modules/user/entities/rermission.entity';
import { Column, JoinTable, ManyToMany } from 'typeorm';

export class Menu extends BaseEntities {
  @IsNumber()
  @IsNotEmpty()
  @ApiCommonProperty()
  @Column('tinyint', {
    comment: '类型',
  })
  type: number; // 0 是路由 1 是数据权限  自己配置  2 是页面配置

  @ApiUpdateProperty()
  @IsNotEmpty()
  @IsNumber()
  @Column({
    comment: '类型',
    type: 'integer',
    name: 'parent_id',
  })
  parentId: number;

  @ApiCommonProperty()
  @IsString()
  @Column('text', {
    comment: '页面配置',
    name: 'settting',
  })
  settting?: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'menu_permissions',
  })
  permissions?: Permission[];
}
