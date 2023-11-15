import { ApiProperty } from '@nestjs/swagger';
import { ResponseVo } from 'src/modules/base/dto/response.vo';
import { User } from 'src/modules/user/entities/user.entity';

export class UserCurrentResponseVo extends ResponseVo {
  @ApiProperty({
    type: User,
    description: '获取当前用户',
    default: { user: {} },
  })
  data: User;
}
