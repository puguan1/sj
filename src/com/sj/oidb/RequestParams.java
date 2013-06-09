package com.sj.oidb;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

public class RequestParams {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	/**
	 * 获取请求参数
	 * @param requestParams
	 * @return
	 */
	public  Map<String,String> getRequestParams(Map<String,String[]> requestParams) {
		Map<String,String> p=new HashMap<String,String>();
		for(Object o  : requestParams.keySet()){
			String[] s=(String[])requestParams.get(o);
			p.put(o.toString(), s[0]);
		}
		return p;
	}
	/**
	 * 获取post参数
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public Map<String,String> getPostParams(String body){
		//System.out.println(body);
		Map<String,String> p=new HashMap<String,String>();
		String [] params=body.split("&");
		String []pp;
		for(int i=0;i<params.length;i++){
			pp=params[i].split("=");
			System.out.println(params[i]);
			if(pp.length==2){
				try {
					p.put(pp[0],URLDecoder.decode(pp[1],"utf-8"));
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				//p.put(pp[0],pp[1]);
			}
		}
		return p;
	}
	
	   /** 
     * Read the next line of input. 
     * 
     * @return a String containing the next line of input from the stream, or 
     *         null to indicate the end of the stream. 
     * @exception IOException 
     *                if an input or output exception has occurred. 
     */  
	public String readLine(HttpServletRequest request) throws IOException{  
		  char[] readerBuffer = new char[request.getContentLength()];
		  BufferedReader bufferedReader = request.getReader();
		  
		  //Logger.info("开始处理上传数据");
		  int portion = bufferedReader.read(readerBuffer);
		  int amount = portion;
		  while (amount < readerBuffer.length) 
		  {
		   portion = bufferedReader.read(readerBuffer, 
		           amount, readerBuffer.length - amount);
		   amount = amount + portion;
		  }

		  StringBuffer stringBuffer = new StringBuffer(
		                  (int) (readerBuffer.length * 1.5) );
		  for (int index = 0; index < readerBuffer.length; index++) 
		  {
		   char c = readerBuffer[index];
		   stringBuffer.append(c);
		  }
		 
		  String xml = stringBuffer.toString();
		  //logger.info(xml);
		  return xml;
    } 

}
