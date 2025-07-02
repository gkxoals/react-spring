package com.community.sample.user.DTO;

import com.community.sample.user.Entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private int userId;
    private String username;
    private String nickname;
    private String email;
    private UserRole role;
    private LocalDateTime createdAt;

    private String token;

}

