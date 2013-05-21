package com.sj.util;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.SimpleTimeZone;

public final class Util {

	public static final String DEFAULT_ENCODING = "utf-8";

	public static final String SUCCESS = "success";

	public static final String ERROR = "error";

	public static final String SERVER_BUSY = "serverBusy";

	public static final String NOT_LOGIN = "notLogin";

	public static final String POST_METHOD_ERROR = "postMethodError";

	public static final String JSON = "json";

	public static final double SIZE_HEX = 1024;

	private static final DecimalFormat df = new DecimalFormat("#0.00");

	private static final char[] hexDigits = { '0', '1', '2', '3', '4', '5',
			'6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

	public static final String getFileSuffix(String filename) {
		int index;
		if (filename != null && (index = filename.lastIndexOf(".")) != -1
				&& index < filename.length() - 1) {
			return filename.substring(index);
		}

		return "";
	}

	public static final String getFileSize(long size) {
		if (size <= 0) {
			return null;
		}

		if (size < SIZE_HEX * SIZE_HEX) {
			return df.format(((double) size) / SIZE_HEX) + "K";
		}

		if (size < SIZE_HEX * SIZE_HEX * SIZE_HEX) {
			return df.format(((double) size) / (SIZE_HEX * SIZE_HEX)) + "M";
		}

		return df.format(((double) size) / (SIZE_HEX * SIZE_HEX * SIZE_HEX))
				+ "G";
	}

	public static final String byteToHexString(byte[] bytes) {
		char[] str = new char[32];
		int k = 0;
		for (int i = 0; i < 16; i++) {
			byte b = bytes[i];
			str[k++] = hexDigits[(b >>> 4) & 0xf];
			str[k++] = hexDigits[b & 0xf];
		}
		return new String(str);
	}

	public static final String toGMTString(long time) {
		Date date = new Date(System.currentTimeMillis() + time);
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"EEE, dd MMM yyyy HH:mm:ss z", Locale.ENGLISH);
		dateFormat.setTimeZone(new SimpleTimeZone(0, "GMT"));
		return dateFormat.format(date);
	}

}
