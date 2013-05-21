package com.sj.admin;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.sj.util.Util;

public class PostMethodInterceptor implements Interceptor {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6978482927854414283L;

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
		if (!"POST".equals(ServletActionContext.getRequest().getMethod())) {
			return Util.POST_METHOD_ERROR;
		}
		return invocation.invoke();
	}
}
