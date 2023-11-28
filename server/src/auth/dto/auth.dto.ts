import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  username: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class DecryptedToken {
  exp: number;
  iat: number;
  login: string;
  sub: number;
}
