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

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @CreateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({ name: 'create_by', update: false })
  createBy!: string;

  @Column({ name: 'update_by' })
  updateBy!: string;

  @Column({ type: 'varchar', nullable: true })
  remark: string | undefined | null;

  @VersionColumn({ select: false })
  version!: number;

  @Column()
  isDelete!: number;

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
