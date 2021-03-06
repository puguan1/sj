package com.sj.oidb;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.sj.database.News;

public class addSource extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public addSource() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		RequestParams rp=new RequestParams();
		News n=new News();
		out.flush();
		out.close();
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");  
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		RequestParams rp=new RequestParams();
		String body=rp.readLine(request);
		Map<String,String> bodyParams=rp.getPostParams(body);
		News n=new News();
		NewsService ns=new NewsService();
		n.setTitle(bodyParams.get("title"));
		n.setContent(bodyParams.get("content"));
		n.setLogo(bodyParams.get("logo"));
		n.setType(bodyParams.get("type"));
		n.setLink(bodyParams.get("link"));
		System.out.println("接受倒:"+bodyParams.get("content"));
		ns.addNews(n);
		JSONObject jo=new JSONObject();
		jo.put("ec", 0);
		out.println(jo);
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
