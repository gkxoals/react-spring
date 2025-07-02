package com.community.sample.board.DTO;

import com.community.sample.board.entity.Board;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class BoardDTO {
    private Long boardId;
    private int authorId;
    private String authorNickname;
    private String title;
    private String content;

    public static BoardDTO fromEntity(Board entity) {
        BoardDTO dto = new BoardDTO();
        dto.setBoardId((long) entity.getBoard_Id());
        dto.setAuthorId(Math.toIntExact(entity.getAuthor().getUser_Id())); // Long → int 변환
        dto.setAuthorNickname(entity.getAuthor().getNickname());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        return dto;
    }

}
