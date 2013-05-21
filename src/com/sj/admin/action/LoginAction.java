package com.sj.admin.action;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.apache.struts2.ServletActionContext;

import com.sj.admin.LoginValidator;
import com.sj.util.Util;

public class LoginAction extends JsonActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 551846253186591288L;
	private String username;
	private String password;
	private String redirect;
	private String requestDefaultUrl;

	@Override
	public String execute() throws Exception {
		LoginValidator.setLogged(false);
		if (!"admin".equals(username) || !"admin".equals(password)) {
			return Util.ERROR;
		}
		LoginValidator.setLogged(true);
		return Util.SUCCESS;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRedirect() throws UnsupportedEncodingException {
		if (redirect == null) {
			redirect = ServletActionContext.getRequest().getParameter(
					"reditect");
		}
		return redirect == null ? requestDefaultUrl : URLDecoder.decode(
				redirect, Util.DEFAULT_ENCODING);
	}

	public void setRedirect(String redirect) {
		this.redirect = redirect;
	}

	public void setRequestDefaultUrl(String requestDefaultUrl) {
		this.requestDefaultUrl = requestDefaultUrl;
	}

}
