package com.community.sample.board.controller;

import com.community.sample.board.DTO.BoardDTO;
import com.community.sample.board.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/create")
    public ResponseEntity<BoardDTO> create(@RequestBody BoardDTO boardDTO){
        BoardDTO createBoard = boardService.createBoard(boardDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createBoard);
    }

    @PostMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable Long id) {
        BoardDTO boardDTO = boardService.getBoardById(id);
        return ResponseEntity.ok(boardDTO);
    }

    @PostMapping("/update")
    public ResponseEntity<BoardDTO> updateBoard(@RequestBody BoardDTO boardDTO) {
        BoardDTO updatedBoard = boardService.updateBoard((long) boardDTO.getAuthorId(), boardDTO);
        return ResponseEntity.ok(updatedBoard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BoardDTO> deleteBoard(@RequestBody Map<String, Long> request) {
        Long id =request.get("id");
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        List<BoardDTO> boardList = boardService.getAllBoards();
        return ResponseEntity.ok(boardList);
    }

}
