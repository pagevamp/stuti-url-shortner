import { IsNotEmpty, IsString } from "class-validator";

export class ShortenUrlDto{
    @IsNotEmpty()
    @IsString()
    original_url : string
    
    @IsNotEmpty()
    @IsString()
    user_id : string  
}