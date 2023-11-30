import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { Permission } from 'src/modules/user/entities/rermission.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Role extends BaseEntities {
  //角色编码
  @Column({ type: 'varchar', length: 20, nullable: true, comment: '角色编码' })
  code: string;

  //角色描述
  @Column({
    type: 'varchar',
    length: 200,
    comment: '角色描述',
    nullable: true,
  })
  describe: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions',
  })
  permissions?: Permission[];
}
