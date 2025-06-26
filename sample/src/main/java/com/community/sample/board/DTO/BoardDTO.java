package com.community.sample.board.DTO;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class BoardDTO {

    private int authorId;
    private String title;
    private String content;

}
