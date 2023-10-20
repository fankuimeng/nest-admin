import { IsEmail } from 'class-validator';
import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { Column, Entity } from 'typeorm';

//  Contains, IsDate, IsEmail, IsFQDN, IsInt, Length, Max, Min;  class-validator
@Entity('user_info')
export class User extends BaseEntities {
  @IsEmail()
  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱号',
    length: 50,
  })
  email: string | null;

  //电话号码
  // @pa({ args: /^1\d{10}$/, msg: '电话号码格式不正确' })
  @Column('tinyint', {
    name: 'phone',
    width: 11,
    comment: '手机号',
  })
  phone: string;

  @Column('varchar', {
    name: 'nickname',
    nullable: true,
    comment: '用户昵称',
    length: 50,
  })
  nickname: string;

  @Column('varchar', {
    name: 'password',
    comment: '密码',
    length: 255,
    select: false,
  })
  password: string;

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
    name: 'is_disable',
    comment: '是否禁用',
    width: 1,
    default: 0,
  })
  isDisable: number;

  //   @OneToMany(() => Comment, (comment) => comment.userinfo)
  //   comments: Comment[];

  //   @OneToMany(() => Message, (message) => message.user)
  //   messages: Message[];

  //   @OneToMany(() => Talk, (talk) => talk.userinfo)
  //   talks: Talk[];

  //   @OneToMany(() => TalkComment, (talkComment) => talkComment.userinfo)
  //   talkComments: TalkComment[];

  //   @OneToMany(() => Article, (article) => article.userinfo)
  //   articles: Article[];

  //   @ManyToOne(() => Role, (role) => role.userInfos, {
  //     onDelete: 'RESTRICT',
  //     onUpdate: 'CASCADE',
  //   })
  //   @JoinColumn([{ name: 'user_roleId', referencedColumnName: 'id' }])
  //   userRole: Role;

  //   menus: Menu[];
  //   resources: Resource[];
}
