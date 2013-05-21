package com.sj.admin;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class CharacterEncodingFilter implements Filter {

	private String encoding;
	private boolean forceEncoding;

	@Override
	public void init(FilterConfig config) throws ServletException {
		encoding = config.getInitParameter("encoding");
		if (encoding == null) {
			encoding = "utf-8";
		}
		forceEncoding = "true".equals(config.getInitParameter("forceEncoding"));
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		if (encoding != null
				&& (forceEncoding || request.getCharacterEncoding() == null)) {
			request.setCharacterEncoding(encoding);
			if (forceEncoding) {
				response.setCharacterEncoding(encoding);
				((HttpServletResponse) response).addHeader("Content-Type",
						"text/html; charset=UTF-8");
			}
		}
		filterChain.doFilter(request, response);

	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}
}
