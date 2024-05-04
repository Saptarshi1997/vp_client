export function modVideoDetails(data) {
    let respArr = [];
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let modObj = {};
            if (data[i].title == null || data[i].title == undefined || data[i].title.length == 0) {
                modObj["title"] = "";
            } else {
                modObj["title"] = data[i].title;
            }
            if (data[i].description == null || data[i].description == undefined || data[i].description.length == 0) {
                modObj["description"] = "";
            } else {
                modObj["description"] = data[i].description;
            }
            if (data[i].duration == null || data[i].duration == undefined || data[i].duration.length == 0) {
                modObj["duration"] = "";
            } else {
                modObj["duration"] = data[i].duration;
            }
            if (data[i].views == null || data[i].views == undefined || data[i].views.length == 0) {
                modObj["views"] = "";
            } else {
                modObj["views"] = data[i].views;
            }
            if (data[i].owner == null || data[i].owner == undefined || data[i].owner.length == 0) {
                modObj["owner"] = "";
            } else {
                modObj["owner"] = data[i].owner;
            }
            if (data[i].videoFile == null || data[i].videoFile == undefined || data[i].videoFile.length == 0) {
                modObj["videoFile"] = "";
            } else {
                modObj["videoFile"] = data[i].videoFile;
            }
            if (data[i].thumbnail == null || data[i].thumbnail == undefined || data[i].thumbnail.length == 0) {
                modObj["thumbnail"] = "";
            } else {
                modObj["thumbnail"] = data[i].thumbnail;
            }
            if (data[i].createdAt == null || data[i].createdAt == undefined || data[i].createdAt.length == 0) {
                modObj["createdAt"] = "";
            } else {
                modObj["createdAt"] = data[i].createdAt;
            }
            respArr.push(modObj);
        }
    }
    return respArr;
}