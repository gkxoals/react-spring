package com.community.sample.board.entity;

import com.community.sample.user.Entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder // 검색 적용 ㄲ //https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%EB%B9%8C%EB%8D%94Builder-%ED%8C%A8%ED%84%B4-%EB%81%9D%ED%8C%90%EC%99%95-%EC%A0%95%EB%A6%AC
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int board_Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") //외래키 컬럼 이름 지정
    private User author;

    private String title;
    private String content;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist //엔티티 처음 저장되기 전에 실행되는 메서드
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() { //엔티티가 수정도기 전에 실행되는 메서드
        this.updatedAt = LocalDateTime.now(); //수정 시간으로 업데이트 갱신
    }

}
