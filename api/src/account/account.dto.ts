import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {

    @ApiProperty()
    company: string;

    @ApiProperty()
    user: string

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class LoginAccountDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

}


export class AddNewUserDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isAdmin: boolean;
}