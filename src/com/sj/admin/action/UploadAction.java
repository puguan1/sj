package com.sj.admin.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.sj.admin.Context;
import com.sj.util.Util;

public class UploadAction extends JsonActionSupport {

	/**
	 * ec=101: 文件不能为空或超过5M
	 */
	private static final long serialVersionUID = 435285643425725561L;

	private String requestAllowedTypes;
	private long requestMaxSize;
	private String requestSaveDir;
	private String maxSize;
	private File dir;

	private static final String DEFAULT_IMAGE_DIR = "images";
	private static final long DEFAULT_MAX_SIZE = 1024 * 1024 * 5;
	private final byte[] BUFFER = new byte[1024 * 1024 * 2];

	private File file;
	private String fileFileName;
	private String fileContentType;

	private String imgId;
	
	private static final int BUFFER_SIZE = 16 * 1024 ;
	/**
	 * 拷贝文件
	 * @param src
	 * @param dst
	 */
	private static void copy(File src, File dst) {
         try {
            InputStream in = null ;
            OutputStream out = null ;
             try {                
                in = new BufferedInputStream( new FileInputStream(src), BUFFER_SIZE);
                out = new BufferedOutputStream( new FileOutputStream(dst), BUFFER_SIZE);
                 byte [] buffer = new byte [BUFFER_SIZE];
                 while (in.read(buffer) > 0 ) {
                    out.write(buffer);
                } 
            } finally {
                 if ( null != in) {
                    in.close();
                } 
                 if ( null != out) {
                    out.close();
                } 
            } 
        } catch (Exception e) {
            e.printStackTrace();
        } 
    } 
	@Override
	public String execute() throws Exception {
		init();
		if (file == null || file.length() < 1 || file.length() > requestMaxSize) {
			this.setEc(101);
			this.setMsg("文件大小不能为空或超过" + maxSize);
			return Util.JSON;
		}
/*		if (fileFileName == null
				|| fileContentType == null
				|| requestAllowedTypes.indexOf(fileContentType.toLowerCase()) == -1) {
			System.out.println("类型："+fileContentType);
			this.setEc(102);
			this.setMsg("文件类型不正确。");
			return Util.JSON;
		}*/

		FileInputStream fis = new FileInputStream(file);
		MessageDigest md = MessageDigest.getInstance("MD5");
		int len;
		while ((len = fis.read(BUFFER)) != -1) {
			md.update(BUFFER, 0, len);
		}
		fis.close();
		/*this.imgId = Util.byteToHexString(md.digest())
				+ Util.getFileSuffix(fileFileName);*/
		this.imgId=new Date().getTime()+Util.getFileSuffix(fileFileName);
		File destFile = new File(dir + "/" + this.imgId);
		/*if (!destFile.exists()) {
			FileOutputStream fos = new FileOutputStream(destFile);
			while ((len = fis.read(BUFFER)) != -1) {
				fos.write(BUFFER, 0, len);
			}
			fos.close();
			fis.close();
		}*/
		copy(file,destFile);
		HttpServletResponse response = ServletActionContext.getResponse();  
		response.setContentType("text/html;charset=UTF-8");
		JSONObject jo=new JSONObject();
		jo.put("ec",0);
		jo.put("imgId",this.imgId);
		response.getWriter().print(jo);  
	    return NONE; 
		//return Util.JSON;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public void setRequestAllowedTypes(String requestAllowedTypes) {
		if (this.requestAllowedTypes == null) {
			this.requestAllowedTypes = "."
					+ (requestAllowedTypes == null ? "" : requestAllowedTypes
							.replace(",", ".")).toLowerCase();
		}
	}

	public void setRequestMaxSize(long requestMaxSize) {
		if (this.requestMaxSize <= 0) {
			this.requestMaxSize = requestMaxSize;
			if (this.requestMaxSize <= 0) {
				this.requestMaxSize = DEFAULT_MAX_SIZE;
			}
			maxSize = Util.getFileSize(this.requestMaxSize);
		}
	}

	public void setRequestSaveDir(String requestSaveDir) {
		if (this.requestSaveDir == null) {
			this.requestSaveDir = requestSaveDir == null ? DEFAULT_IMAGE_DIR
					: requestSaveDir;
			dir = new File(ServletActionContext.getRequest().getRealPath("/") + this.requestSaveDir);
			dir.mkdirs();
			//System.out.println("路径："+dir.getAbsolutePath());
		}
	}

	private void init() {
		this.setRequestAllowedTypes("");
		this.setRequestMaxSize(DEFAULT_MAX_SIZE);
		this.setRequestSaveDir(DEFAULT_IMAGE_DIR);
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getImgId() {
		return imgId;
	}
}
