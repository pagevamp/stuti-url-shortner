import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// to ensure that password contains at least : one lowercase letter,one uppercase letter,
// one digit and one of the following characters => !@#$%^&*
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(20, { message: 'Username cannot exceed 20 characters' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  readonly username: string;

  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 16, { message: 'Password must be at least 8 and at most 16 characters' })
  @Matches(passwordRegex, {
    message: `Password must contain at least : one lowercase letter, 
       one uppercase letter, one digit and one of the symbols !@#$%^&*`,
  })
  readonly password: string;
}
