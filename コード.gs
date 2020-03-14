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
    }else　if (params.option === set) {
      var json = Json.parse(properties.getProperty(params.name));
      json.isKagawa = params.value;
      properties.setProperty(params.name, Json.stringify(json));
      isKagawa = data.isKagawa;
      weekPlayTime = data.weekPlayTime;
      dayPlayTime = data.dayPlayTime;
      allPlayTime = data.allPlayTime;
    } else {
      isKagawa = data.isKagawa;
      weekPlayTime = data.weekPlayTime;
      dayPlayTime = data.dayPlayTime;
      allPlayTime = data.allPlayTime;
    }
  } else {
    if (params.option === "register") {
      properties.setProperty(params.name, Json.stringify({isKagawa: params.value, weekPlayTime: weekPlayTime, dayPlayTime: dayPlayTime, allPlayTime: allPlayTime}));
      isKagawa = params.value;
      }
    }
  
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({isKagawa: isKagawa, weekPlayTime: weekPlayTime, dayPlayTime: dayPlayTime, allPlayTime: allPlayTime}));

  return output;
}
