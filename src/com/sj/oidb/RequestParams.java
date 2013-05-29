package com.sj.oidb;

import java.util.HashMap;
import java.util.Map;

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

}
