package com.northbr.server.controller;

import com.northbr.server.service.BoardService;
import com.northbr.server.utils.ProcessResult;
import com.northbr.server.vo.BoardListVo;
import com.northbr.server.vo.BoardVo;
import com.northbr.server.vo.SearchVo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

  private BoardService boardService;

  public BoardController(BoardService boardService) {
    this.boardService = boardService;
  }

  @GetMapping("/board/{category}")
  public BoardListVo getBoardItems(@PathVariable("category") String category, SearchVo searchVo) throws Exception {
    searchVo.setCategory(category);
    return boardService.getBoardItems(searchVo);
  }

  @GetMapping("/board/{category}/{id}")
  public BoardVo getBoardItem(@PathVariable("id") int id) throws Exception {
    return boardService.getBoardItem(id);
  }

  @PostMapping("/board")
  public ProcessResult addBoardItem(@RequestBody BoardVo boardVo) throws Exception {
    return boardService.addBoardItem(boardVo);
  }

}