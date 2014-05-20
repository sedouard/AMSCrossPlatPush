package com.example.crossplatformpush;

import android.content.Context;

import com.microsoft.windowsazure.notifications.NotificationsHandler;
import com.microsoft.windowsazure.messaging.*;

public class Handler extends NotificationsHandler {

	@Override
	public void onRegistered(Context context, String gcmregId){
		super.onRegistered(context, gcmregId);
		
		
		//register to notification hub
		NotificationHub hub = new NotificationHub("<NOTIFICATION HUB NAME>", "<NOTIFICATION HUB CONNECTION STRING>",
				context);
		
		try{
			hub.register(gcmregId, "breaking_news", "user:1234");
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
}
