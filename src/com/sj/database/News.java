package com.sj.database;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * News entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "news", catalog = "sj")
public class News implements java.io.Serializable {

	// Fields

	private String id;
	private String title;
	private String content;
	private String time;
	private String type;
	private Integer pv;
	private String writer;
	private String logo;
	private String link;

	// Constructors

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	/** default constructor */
	public News() {
	}

	/** minimal constructor */
	public News(String id) {
		this.id = id;
	}

	/** full constructor */
	public News(String id, String title, String content, String time,
			String type, Integer pv, String writer,String logo,String link) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.time = time;
		this.type = type;
		this.pv = pv;
		this.writer = writer;
		this.logo = logo;
		this.link=link;
	}

	// Property accessors
	@Id
	@Column(name = "id", unique = true, nullable = false)
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "title", length = 128)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "content")
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "time", length = 19)
	public String getTime() {
		return this.time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Column(name = "type", length = 45)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "pv")
	public Integer getPv() {
		return this.pv;
	}

	public void setPv(Integer pv) {
		this.pv = pv;
	}

	@Column(name = "writer", length = 45)
	public String getWriter() {
		return this.writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

}