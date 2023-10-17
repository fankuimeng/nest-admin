import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin(nickname: string, password: string) {
    const userinfo = await this.userService.findOne({ where: { nickname } });
    const flag = await bcrypt.compare(password, userinfo.password);

    if (userinfo && flag) {
      const { menu, resource } = await this.getPermission(userinfo.userRole.id);
      const roleId = userinfo.userRole.id;
      const permission = {
        roleId,
        resource,
      };
      this.redisService.setValue(
        `user:${userinfo.id}`,
        JSON.stringify(permission),
      );
      // 生成token此时请求就带有token了
      const token = await this.jwt.signAsync({
        nickname: userinfo.nickname,
        sub: userinfo.id,
      });
      delete userinfo.password;
      userinfo.menus = menu;
      return { userinfo, token };
    }

    throw new loginError('账号或密码错误');
  }

  findAll() {
    this.userService.removeMany();
    return `This action returns all auth`;
  }

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
