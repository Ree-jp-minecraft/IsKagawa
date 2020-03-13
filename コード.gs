function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString());
  var properties = PropertiesService.getScriptProperties();
  var data = Json.parse(properties.getProperty(params.name));
  
  var isKagawa = "guest";
  var weekPlayTime = 0;
  var dayPlayTime = 0;
  var allPlayTime = 0;
  
  if (properties.getProperty(params.name)) {
    if (params.option === "add") {
      data.weekPlayTime += params.value;
      data.dayPlayTime += params.value;
      data.allPlayTime += params.value;
      isKagawa = data.isKagawa;
      weekPlayTime = data.weekPlayTime;
      dayPlayTime = data.dayPlayTime;
      allPlayTime = data.allPlayTime;
      properties.setProperty(params.name, Json.stringify({isKagawa: isKagawa, weekPlayTime: weekPlayTime, dayPlayTime: dayPlayTime, allPlayTime: allPlayTime}));
    }else {
      isKagawa = data.isKagawa;
      weekPlayTime = data.weekPlayTime;
      dayPlayTime = data.dayPlayTime;
      allPlayTime = data.allPlayTime;
    }
  } else {
    if (params.option === "register") {
      properties.setProperty(params.name, Json.stringify({isKagawa: params.value, weekPlayTime: weekPlayTime, dayPlayTime: dayPlayTime, allPlayTime: allPlayTime}));
      isKagawa = params.value;
    } else if (params.option === "get") {
      var userDatas = properties.getProperties();
    }
  }
  
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({isKagawa: isKagawa, weekPlayTime: weekPlayTime, dayPlayTime: dayPlayTime, allPlayTime: allPlayTime}));

  return output;
}
