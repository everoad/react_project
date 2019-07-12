package com.northbr.server.mapper;

import java.util.List;

import com.northbr.server.vo.BoardVo;
import com.northbr.server.vo.ImageVo;
import com.northbr.server.vo.SearchVo;

public interface BoardMapper {

  public List<BoardVo> selectBoardItems(SearchVo searchVo);

  public int selectBoardItemsCount(SearchVo searchVo);

  public BoardVo selectBoardItem(int boardId);

  public ImageVo selectBoardImage(int imageId);

  public int insertBoardItem(BoardVo boardVo);

  public int deleteBoardItem(BoardVo boardVo);

  public int updateBoardItem(BoardVo boardVo);

}