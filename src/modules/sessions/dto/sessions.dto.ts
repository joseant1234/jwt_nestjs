import { ApiProperty } from '@nestjs/swagger';

export class SessionsDtoReq {

    @ApiProperty({
        description: 'username',
        example: 'tests',
        type: String,
        required: true,
    })
    username: string;

    @ApiProperty({
        description: 'password',
        example: '123456',
        type: String,
        required: true,
    })
    password: string;
}
