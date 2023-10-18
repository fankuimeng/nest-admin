import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { responseMessage } from 'src/utils';

@Injectable()
export class AuthService {
  constructor() {}

  async signin(nickname: string, password: string) {
    // const userinfo = await this.userService.findOne({ where: { nickname } });
    // const flag = await bcrypt.compare(password, userinfo.password);
    // if (userinfo && flag) {
    //   const { menu, resource } = await this.getPermission(userinfo.userRole.id);
    //   const roleId = userinfo.userRole.id;
    //   const permission = {
    //     roleId,
    //     resource,
    //   };
    //   this.redisService.setValue(
    //     `user:${userinfo.id}`,
    //     JSON.stringify(permission),
    //   );
    //   // 生成token此时请求就带有token了
    //   const token = await this.jwt.signAsync({
    //     nickname: userinfo.nickname,
    //     sub: userinfo.id,
    //   });
    //   delete userinfo.password;
    //   userinfo.menus = menu;
    //   return { userinfo, token };
    // }
    // throw new loginError('账号或密码错误');
  }

  // async validateUser(user: Partial<User>): Promise<responseResult> {
  //   // 解构参数
  //   const { nickname, password, phone } = user;

  //   // 判断是否是用户登录，否则是手机登录
  //   const type = 'nickname' in user ? 'account' : 'mobile';
  //   // 查询条件
  //   const where = type === 'account' ? { nickname } : { phone };
  //   // 查找用户
  //   const userInfo = await this.userService.findOne({ where });
  //   // 根据登录类型执行不同的处理
  //   switch (type) {
  //     // 用户名登录
  //     case 'account':
  //       // 根据用户信息不同，返回相应的信息
  //       if (session.verifyCode.toUpperCase() !== verifyCode.toUpperCase()) {
  //         return responseMessage({}, '验证码不正确!', -1);
  //       } else if (!userInfo) {
  //         return responseMessage({}, '用户不存在!', -1);
  //       } else if (userInfo.password !== password) {
  //         const flag = await bcrypt.compare(password, userinfo.password);
  //         return responseMessage({}, '密码不正确!', -1);
  //       } else if (!userInfo.isDisable) {
  //         return responseMessage({}, '当前用户已被禁用,请联系管理员!', -1);
  //       }
  //     // 手机登录
  //     case 'mobile':
  //       if (!userInfo) {
  //         return responseMessage({}, '手机号码不存在!', -1);
  //       }
  //   }
  //   return responseMessage(userInfo, '登录成功!');
  // }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
