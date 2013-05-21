package com.sj.admin;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.sj.util.Util;

public class CheckLoginInterceptor implements Interceptor {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5958824891008373392L;

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init() {
		// TODO Auto-generated method stub

	}

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {

		return LoginValidator.hasLogged() ? invocation.invoke()
				: Util.NOT_LOGIN;
	}
}
