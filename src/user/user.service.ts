import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { hash, compare } from 'bcryptjs';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(data: CreateUserDto) {
    return this.userRepository.creatOne(data);
  }

  findById(id: number) {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async updateUser(id: number, body: UpdateUserDto) {
    let user = await this.findById(id);

    if (!(await compare(body.password, user.password)))
      throw new BadRequestException({
        errors: {
          password: ['the password is incorrect'],
        },
      });

    if (body.newpassword && body.newpassword != body.passwordconfirm) {
      throw new BadRequestException({
        errors: {
          passwordconfirm: [
            'the passwordconfirm should be equal to the new password',
          ],
        },
      });
    }
    if (body.newpassword) body.password = await hash(body.newpassword, 12);
    else delete body.password;
    return this.userRepository.findByIdAndUpdate(id, body);
  }
}
