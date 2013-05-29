package com.sj.oidb;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.sj.database.HibernateSessionFactory;
import com.sj.database.News;
import com.sj.database.NewsDAO;



public class NewsService {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		NewsService nd=new NewsService();
		for(int i=0;i<10;i++){
			News news=new News();
			news.setContent("hello xx"+i);
			news.setType(i+"");
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			String time = df.format(new Date());
			news.setTime(time);
			nd.addNews(news);
		}

	}
	public String generateId(){
		String id="";
		id=new Date().getTime()+"";
		return id;
	}
	/**
	 * 
	 * @param news
	 * @return
	 */
	public boolean addNews(News news){
		boolean result=true;
		Transaction tx=null; 
		Session session=HibernateSessionFactory.getSession();
		try{
			NewsDAO nd=new NewsDAO();
			tx=session.beginTransaction();
			news.setId(generateId());
			nd.save(news);
			tx.commit();	
		}catch(Exception e){
			result=false;
		}finally{
			session.close();
		}
		return result;
	}
	
	public List<News> getNews(){
		NewsDAO nd=new NewsDAO();
		return nd.findAll();
	}
	public News getNewsById(String id){
		NewsDAO nd=new NewsDAO();
		News result=new News();
		try{
			result=nd.findById(id);
		}catch(Exception e){
			
		}finally{
			return result;
		}
		
	}
	public List<News> getNewsByParams(Map p){
		String type=(String) p.get("type");
		String []typeArray;
		if(type==null||type.equalsIgnoreCase("")){
			type="0";//默认为0
		}
		typeArray=type.split("-");
		List<News> result=new ArrayList<News>();
		Session session=HibernateSessionFactory.getSession();
		String hql="from News n where ";
		for(int i=0;i<typeArray.length;i++){
			if(i==0){
				hql+=" n.type="+typeArray[i];
			}else{
				hql+=" or n.type="+typeArray[i];
			}
		}
		Query q=session.createQuery(hql);
		result=q.list();
		return result;
		
	}

}
