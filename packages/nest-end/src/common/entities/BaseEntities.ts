import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntities {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '唯一主键' })
  id: number;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '名称 英文名',
    length: 50,
  })
  name: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @CreateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({ name: 'create_by', comment: '创建人', update: false })
  createBy!: string;

  @Column({ name: 'update_by', comment: '更新人' })
  updateBy!: string;

  @Column({ type: 'varchar', nullable: true })
  remark: string | undefined | null;

  @VersionColumn({ select: false })
  version!: number;

  @Column()
  is_delete!: number;

  @BeforeUpdate()
  updateUpdateBy() {
    // console.log('before-update....');
  }

  @BeforeInsert()
  resetCounters() {
    // this.state = 0
    // console.log('before-insert....');
  }
}
