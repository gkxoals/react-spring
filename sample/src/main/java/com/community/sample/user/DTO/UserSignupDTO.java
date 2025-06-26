package com.community.sample.user.DTO;

import lombok.Data;

@Data
public class UserSignupDTO {
    private String username;
    private String password;
    private String nickname;
    private String email;

}

