package com.northbr.server.service.impl;

import java.util.List;

import com.northbr.server.mapper.BoardMapper;
import com.northbr.server.service.BoardService;
import com.northbr.server.utils.ProcessResult;
import com.northbr.server.vo.BoardListVo;
import com.northbr.server.vo.BoardVo;
import com.northbr.server.vo.SearchVo;

import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

  private BoardMapper boardMapper;

  public BoardServiceImpl(BoardMapper mapper) throws Exception {
    boardMapper = mapper;
  }

  @Override
  public BoardListVo getBoardItems(SearchVo searchVo) throws Exception {
    List<BoardVo> items = boardMapper.selectBoardItems(searchVo);
    int itemCount = boardMapper.selectBoardItemsCount(searchVo);

    return new BoardListVo(items, itemCount);
  }

  @Override
  public BoardVo getBoardItem(int boardId) throws Exception {
    return boardMapper.selectBoardItem(boardId);
  }

  @Override
  public ProcessResult addBoardItem(BoardVo boardVo) throws Exception {
    int result = boardMapper.insertBoardItem(boardVo);
    return new ProcessResult(result > 0 ? ProcessResult.SUCCESS_CODE : ProcessResult.FAIL_CODE);
  }

  @Override
  public ProcessResult removeBoardItem(BoardVo boardVo) throws Exception {
    int result = boardMapper.deleteBoardItem(boardVo);
    return new ProcessResult(result > 0 ? ProcessResult.SUCCESS_CODE : ProcessResult.FAIL_CODE);
  }

  @Override
  public ProcessResult editBoardItem(BoardVo boardVo) throws Exception {
    int result = boardMapper.updateBoardItem(boardVo);
    return new ProcessResult(result > 0 ? ProcessResult.SUCCESS_CODE : ProcessResult.FAIL_CODE);
  }

}