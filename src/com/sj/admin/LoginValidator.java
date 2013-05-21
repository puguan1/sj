package com.sj.admin;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.sj.util.Util;

public class LoginValidator implements Filter {

	private static final String LOGIN_FLAG = "has_already_logged";
	private static String LOGIN_PAGE;
	private static final String DEFAULT_LOGIN_PAGE = "/login.html";
	private static final String DEFAULT_INDEX_PAGE = "/admin/index.html";
	private String INDEX_PAGE;
	private String ADMIN_ROOT = "/admin/";
	private boolean supportsBackFrom;

	@Override
	public void init(FilterConfig config) throws ServletException {
		String contextPath = config.getServletContext().getContextPath();
		LOGIN_PAGE = contextPath
				+ ((LOGIN_PAGE = config.getInitParameter("loginPage")) == null ? DEFAULT_LOGIN_PAGE
						: LOGIN_PAGE);
		INDEX_PAGE = contextPath
				+ ((INDEX_PAGE = config.getInitParameter("indexPage")) == null ? DEFAULT_INDEX_PAGE
						: INDEX_PAGE);
		supportsBackFrom = "true".equals(config.getInitParameter("attachDest"));
		ADMIN_ROOT = contextPath + ADMIN_ROOT;
	}

	private static final boolean hasLogged(HttpServletRequest request) {
		HttpSession session = getSession(request);
		return session != null && session.getAttribute(LOGIN_FLAG) != null;
	}

	public static final boolean hasLogged() {
		return hasLogged(ServletActionContext.getRequest());
	}

	private static final void setLogged(HttpServletRequest request,
			boolean logged) {
		HttpSession session = getSession(request, true);
		if (logged) {
			session.setAttribute(LOGIN_FLAG, true);
		} else {
			session.removeAttribute(LOGIN_FLAG);
		}
	}

	public static final void setLogged(boolean logged) {
		setLogged(ServletActionContext.getRequest(), logged);
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		if (!hasLogged(req)) {
			resp.sendRedirect(LOGIN_PAGE
					+ (supportsBackFrom ? (LOGIN_PAGE.indexOf("?") == -1 ? "?" : "&")
							+ "redirect="
							+ URLEncoder.encode(req.getRequestURL().toString(),
									Util.DEFAULT_ENCODING) : ""));
			return;
		}
		if (ADMIN_ROOT.equalsIgnoreCase(req.getRequestURI())) {
			resp.sendRedirect(INDEX_PAGE);
			return;
		}
		chain.doFilter(request, response);
	}

	private static HttpSession getSession(HttpServletRequest request) {
		return getSession(request, false);
	}

	private static HttpSession getSession(HttpServletRequest request,
			boolean flag) {
		return request.getSession(flag);
	}

	@Override
	public void destroy() {

	}
}
