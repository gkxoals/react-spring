package com.community.sample.user.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id //Id 인것을 알려주는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY) //자동으로 Id값 부여
    private int user_Id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false) // null 금지
    private String password;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(updatable = false)
    private LocalDateTime createdAt; // 가입일

    @Column
    private LocalDateTime updatedAt; // 수정일

    @PrePersist //엔티티 처음 저장되기 전에 실행되는 메서드
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.role == null) this.role = UserRole.USER;
    }

    @PreUpdate
    protected void onUpdate() { //엔티티가 수정도기 전에 실행되는 메서드
        this.updatedAt = LocalDateTime.now(); //수정 시간으로 업데이트 갱신
    }




}
