package com.sj.admin;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import com.sj.util.Util;

public class CacheFilter implements Filter {

	private String cacheTime;
	private String expires;

	@Override
	public void init(FilterConfig config) throws ServletException {
		try {
			int time = Integer.parseInt(config.getInitParameter("maxAge"));
			if (time > 0) {
				expires = Util.toGMTString(time * 1000);
				cacheTime = "max-age=" + time;
			}
		} catch (Exception e) {
		}

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		filterChain.doFilter(request, response);
		if (cacheTime != null) {
			HttpServletResponse resp = (HttpServletResponse) response;
			resp.addHeader("Cache-Control", cacheTime);
			resp.addHeader("Expires", expires);
		}
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

}
