package com.sj.oidb;


import java.util.List;

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
		News news=new News();
		news.setId(12221);
		news.setContent("hello xx");
		nd.addNews(news);
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

}
