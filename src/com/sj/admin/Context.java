package com.sj.admin;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class Context implements ServletContextListener {

	private static String CONTEXT_PATH;
	private static String LOCAL_CONTEXT_PATH;

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		ServletContext servletContext = event.getServletContext();
		CONTEXT_PATH = servletContext.getContextPath();
		LOCAL_CONTEXT_PATH = servletContext.getRealPath("/");
	}

	public static final String getContextPath() {
		return CONTEXT_PATH;
	}

	public static final String getLocalContextPath() {
		return LOCAL_CONTEXT_PATH;
	}
}
