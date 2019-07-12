package com.northbr.server.service;

import com.northbr.server.utils.ProcessResult;
import com.northbr.server.vo.BoardListVo;
import com.northbr.server.vo.BoardVo;
import com.northbr.server.vo.SearchVo;

public interface BoardService {

  public BoardListVo getBoardItems(SearchVo searchVo);

  public BoardVo getBoardItem(int boardId);

  public ProcessResult addBoardItem(BoardVo boardVo);

}