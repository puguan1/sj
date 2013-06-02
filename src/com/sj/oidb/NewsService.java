package com.sj.oidb;


import java.lang.reflect.Method;
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
			news.setPv(0);
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			String time = df.format(new Date());
			news.setTime(time);
			nd.save(news);
			tx.commit();	
		}catch(Exception e){
			result=false;
		}finally{
			session.close();
		}
		return result;
	}
	public boolean modNews(Map m){
		boolean result=true;
		Transaction tx=null; 
		Session session=HibernateSessionFactory.getSession();
		try{
			NewsDAO nd=new NewsDAO();
			tx=session.beginTransaction();
			String id=(String)m.get("id");
			News news=nd.findById(id);
			if(news==null){
				return false;
			}
			for(Object key  : m.keySet()){
				if(key.toString().equalsIgnoreCase("id")){
					continue;
				}
				String value=(String)m.get(key);
				String aa = "set" + key.toString().substring(0, 1).toUpperCase()
			                + key.toString().substring(1, key.toString().length());
			    Class<News> classType = News.class;
			    Method method = classType.getMethod(aa,String.class);
			    method.invoke(news, value);
				
			}
			nd.merge(news);
			tx.commit();	
		}catch(Exception e){
			result=false;
		}finally{
			session.close();
		}
		return result;
	}
	/**
	 * 批量删除资源
	 * @param ids
	 * @return
	 */
	public boolean delNews(String ids){
		boolean result=true;
		Transaction tx=null; 
		Session session=HibernateSessionFactory.getSession();
		try{
			NewsDAO nd=new NewsDAO();
			tx=session.beginTransaction();
			String []idArray=ids.split("-");
			for(int i=0;i<idArray.length;i++){
				News news=nd.findById(idArray[i]);
				if(news!=null){
					nd.delete(news);
				}
			}
			tx.commit();	
		}catch(Exception e){
			System.out.println(e);
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
	/**
	 * 支持分页查询
	 * @param p
	 * @return
	 */
	public List<News> getNewsByParams(Map p){
		String type=(String) p.get("type");//数据分类
		String pageSize=(String) p.get("pageSize");//数据每页的数量
		String pageNow=(String) p.get("pageNow");//第几页数据
		String []typeArray;
		if(type==null||type.equalsIgnoreCase("")){
			type="0";//默认为0
		}
		typeArray=type.split("-");
		List<News> result=new ArrayList<News>();
		Session session=HibernateSessionFactory.getSession();
		Transaction tx=null; 
		try{
			tx=session.beginTransaction();
			String hql="from News n where ";
			for(int i=0;i<typeArray.length;i++){
				if(i==0){
					hql+=" n.type="+typeArray[i];
				}else{
					hql+=" or n.type="+typeArray[i];
				}
			}
			Query q;
			if(pageSize!=null&&pageNow!=null){//分页查询
				int first=(Integer.valueOf(pageNow)-1)*Integer.valueOf(pageSize);
				q=session.createQuery(hql).setFirstResult(first).setMaxResults(Integer.valueOf(pageSize));
			}else{
				q=session.createQuery(hql);
			}
			
			result=q.list();
		}catch(Exception e){
			
		}finally{
			session.close();
		}
		return result;
		
	}
	/**
	 * 支持分页查询 总数
	 * @param p
	 * @return
	 */
	public int getNewsByParamsCount(Map p){
		String type=(String) p.get("type");//数据分类
		String []typeArray;
		if(type==null||type.equalsIgnoreCase("")){
			type="0";//默认为0
		}
		typeArray=type.split("-");
		List<News> result=new ArrayList<News>();
		Session session=HibernateSessionFactory.getSession();
		Transaction tx=null; 
		try{
			tx=session.beginTransaction();
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
		}catch(Exception e){
			
		}finally{
			session.close();
		}

		return result.size();
		
	}

}
