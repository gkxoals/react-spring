package com.community.sample.board.Service;

import com.community.sample.board.DTO.BoardDTO;
import com.community.sample.board.Repository.BoardRepository;
import com.community.sample.board.entity.Board;
import com.community.sample.user.Entity.User;
import com.community.sample.user.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public BoardDTO createBoard(BoardDTO boardDTO) {
        // 1. DTO -> Entity 변환
        Board boardEntity = toEntity(boardDTO);

        // 2. DB에 저장
        Board savedBoard = boardRepository.save(boardEntity);

        // 3. 저장된 Entity -> DTO 변환 후 반환
        return toDTO(savedBoard);
    }

    private Board toEntity(BoardDTO dto) {
                Board board = new Board();
        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        User author = userRepository.findById((long) dto.getAuthorId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + dto.getAuthorId()));
        board.setAuthor(author);

        return board;
    }

    private BoardDTO toDTO(Board entity) {
        BoardDTO dto = new BoardDTO();
        dto.setAuthorId(entity.getBoard_Id());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        return dto;
    }


    public BoardDTO getBoardById(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("Board not found with id:"+id));
        return toDTO(board);
    }

    @Transactional
    public BoardDTO updateBoard(Long id, BoardDTO boardDTO) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id: " + id));

        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());

        // author 변경 허용 시 아래도 추가
        if (boardDTO.getAuthorId() > 0) {
            User author = userRepository.findById((long) boardDTO.getAuthorId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + boardDTO.getAuthorId()));
            board.setAuthor(author);
        }

        Board updatedBoard = boardRepository.save(board);
        return toDTO(updatedBoard);
    }
    @Transactional(readOnly = true)
    public void deleteBoard(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Board not found with id: " + id));
        boardRepository.delete(board);
    }
    @Transactional(readOnly = true)
    public List<BoardDTO> getAllBoards() {
        return boardRepository.findAll()
                .stream()
                .map(BoardDTO::fromEntity)
                .collect(Collectors.toList());
    }

}
