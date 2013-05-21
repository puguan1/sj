package com.sj.admin.action;

import com.opensymphony.xwork2.ActionSupport;

public class JsonActionSupport extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6326836820082513819L;

	private int ec = 0;
	private String msg;

	public int getEc() {
		return ec;
	}

	public void setEc(int ec) {
		this.ec = ec;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
