function genKey(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function getData(url) {
  const request = new XMLHttpRequest(),
    method = "GET";
  request.open(method, url);

  const data = new Promise((resolve) => {
    request.onload = () => resolve(request.responseText);
  });

  request.send();
  return data;
}

// async function encryptData() {
//   const rawData = await getData('data/raw.json');
//   console.log('rawData:',rawData);
//   const rawObj = JSON.parse(rawData);
//   let infoObj = [];
//   let encryptedObj = [];
//   let dataCounter = 0;
//   for (let data of rawObj['data']) {
//     const key = genKey(20);
//     infoObj.push({
//       'name': data['name'],
//       'id': dataCounter++,
//       'key': key});
//     encryptedObj.push({
//       'name': CryptoJS.AES.encrypt(data['name'], key).toString(),
//       'msg': CryptoJS.AES.encrypt(data['msg'], key).toString(),
//       'is11': data['is11']});
//   }
//   console.log(infoObj);
//   console.log(JSON.stringify({'data': encryptedObj}));
// }

function decrypt(data, key) {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const original_item = bytes.toString(CryptoJS.enc.Utf8);
  return original_item;
}
async function retrieveForYouData(id, key) {
  // console.log(id, key);
  const data = await getData("data/messages.json");
  const forYouObj = JSON.parse(data);
  if (!forYouObj) return null;

  const dataArr = forYouObj;
  if (id >= dataArr.length) {
    //console.error("Wrong id: " + id + " / " + dataArr.length);
    return null;
  }
  const item = dataArr.find((el) => {
    // console.log('el.id:',el.id);
    // console.log('id:',id);
    return el.id == id;
  });
  try {
    // console.log(item);
    const get_name = decrypt(item.name, key);
    const get_msg = decrypt(item.message, key);
    // console.log("decoded name:", get_name);
    // console.log("decoded msg:", get_msg);
    return {
      name: get_name,
      msg: get_msg,
    };
  } catch (e) {
    console.log("error:", e);
    return null;
  }
}

function findGetParameter(parameterName) {
  const urlParams = new URLSearchParams(window.location.search);
  // var result = null,
  //   tmp = [];
  // // 取得網址從?開始的字串
  // location.search
  //   .substr(1)
  //   .split("&")
  //   .forEach(function (item) {
  //     console.log('param:',item);
  //     tmp = item.split("=");
  //     console.log('tmp:',tmp);
  //     if (tmp[0] === parameterName) {
  //       // 確保 + 號不會被轉換成空格
  //       result = decodeURIComponent(item.split("=")[1].replace(/\+/g, '%20'));
  //     }
  //   });
  // return result;
  // const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameterName).replace(/\s/g, '+');
}

// function encryptSingleData(key, name, msg) {
//   console.log(CryptoJS.AES.encrypt(name, key).toString());
//   console.log(CryptoJS.AES.encrypt(msg, key).toString());
// }

// (async () => {
//   // await encryptData();
//   encryptSingleData();
// })();
