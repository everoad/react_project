package com.northbr.server.service;

import com.northbr.server.utils.ProcessResult;
import com.northbr.server.vo.BoardListVo;
import com.northbr.server.vo.BoardVo;
import com.northbr.server.vo.SearchVo;

public interface BoardService {

  public BoardListVo getBoardItems(SearchVo searchVo) throws Exception;

  public BoardVo getBoardItem(int boardId) throws Exception;

  public ProcessResult addBoardItem(BoardVo boardVo) throws Exception;

  public ProcessResult removeBoardItem(BoardVo boardVo) throws Exception;

  public ProcessResult editBoardItem(BoardVo boardVo) throws Exception;

}