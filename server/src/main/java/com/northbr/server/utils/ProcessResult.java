package com.northbr.server.utils;

public class ProcessResult {

  public final static int SUCCESS_CODE = 1;
  public final static int FAIL_CODE = 0;

  private int resultCode;
  private String message;
  private Object body;

  public ProcessResult(int code) {
    this.resultCode = code;
  }

  public ProcessResult(int code, String message) {
    this.resultCode = code;
    this.message = message;
  }

  public ProcessResult(int code, String message, Object body) {
    this.resultCode = code;
    this.message = message;
    this.body = body;
  }

  public Object getBody() {
    return body;
  }

  public void setBody(Object body) {
    this.body = body;
  }

  public int getResultCode() {
    return resultCode;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setResultCode(int resultCode) {
    this.resultCode = resultCode;
  }

}