const axios = require("axios");
const { Telegraf } = require("telegraf");
const { apikeyTele } = require("./settings/config");

const bot = new Telegraf(apikeyTele);

function getTiktok(ctx) {
  let link = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(
      `https://api.ibeng.tech/api/download/tiktok3?url=${link}&apikey=tamvan`
    )
    .then((res) => {
      let data = res.data.result;
      bot.telegram.sendDocument(ctx.chat.id, data.videoHD, {
        caption: `author: ${data.author} \nlikes: ${data.likes}`,
      });
    });
}

function getImgai(ctx) {
  let prompt = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(
      `https://api.ibeng.tech/api/fun/simisimi-ind2?text=${prompt}&apikey=tamvan`
    )
    .then((res) => {
      let data = res.result.success;
      bot.telegram.sendMessage( data);
    });
}

function getYoutube(ctx) {
  let link = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(`https://api.ibeng.tech/api/download/ytmp4?url=${link}&apikey=tamvan`)
    .then((res) => {
      let data = res.data.result;
      bot.telegram.sendDocument(ctx.chat.id, data.url, {
        caption: `judul: ${data.title} \nviews: ${data.views}`,
      });
    });
}

function getInstagram(ctx) {
  let link = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(`https://api.ibeng.tech/api/downloader/igdl?url=${link}&apikey=tamvan`)
    .then((res) => {
      let data = res.data.result;

      bot.telegram.sendDocument(ctx.chat.id, data.url, {
        caption: `judul: ${data.title}`,
      });
    });
}

function getFacebook(ctx) {
  let link = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(`https://api.ibeng.tech/api/download/fb?url=${link}&apikey=tamvan`)
    .then((res) => {
      let data = res.data.result;
      bot.telegram.sendDocument(ctx.chat.id, data.hd, {
        caption: `judul: ${data.title} \ntime: ${data.time}`,
      });
    });
}

function getPln(ctx) {
  let idpel = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(`https://api.ibeng.tech/api/info/cekpln?apikey=tamvan&id=${idpel}`)
    .then((response) => {
      let data = response.data.data;
      bot.telegram.sendMessage(
        ctx.chat.id,
        `Halo ${data.nama_cust}, tagihan listrik anda sekarang yaitu Rp${data.tagihan} dengan periode ${data.jum_periode}`
      );
      console.log(response.data);
    });
}

function getXsearch(ctx) {
  let query = ctx.message.text.split(" ").slice(1).join(" ");
  try {
    axios
      .get(
        `https://api.ibeng.tech/api/search/xvideossearch?query=${query}&apikey=tamvan`
      )
      .then((res) => {
        let data = res.data.result;
        for (let i = 0; i < data.length; i++) {
          bot.telegram.sendPhoto(ctx.chat.id, data[i].thumb, {
            caption: `title: ${data[1].title} \duration: ${data[1].duration}`,
            reply_markup: {
              inline_keyboard: [[{ text: "🌐", url: data[i].url }]],
            },
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function getXnsearch(ctx) {
  let query = ctx.message.text.split(" ").slice(1).join(" ");
  try {
    axios
      .get(
        `https://api.ibeng.tech/api/search/xnxx?query=${query}&apikey=tamvan`
      )
      .then((res) => {
        let data = res.data.result;
        for (let i = 0; i < data.length; i++) {
          bot.telegram.sendPhoto(ctx.chat.id, data[i].thumb, {
            caption: `title: ${data[1].title} \nduration: ${data[1].duration}`,
            reply_markup: {
              inline_keyboard: [[{ text: "🌐", url: data[i].link }]],
            },
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function getXvid(ctx) {
  let link = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(
      `https://api.ibeng.tech/api/search/xvideosdown?url=${link}&apikey=tamvan`
    )
    .then((res) => {
      let data = res.data.data;
      try {
        bot.telegram.sendVideo(ctx.chat.id, data.url, {
          caption: `judul: ${data.title} \nviews: ${data.views}`,
        });
      } catch (error) {
        console.log(error);
      }
    });
}
function getXnvid(ctx) {
  let link = ctx.message.text.split(" ").slice(1).join(" ");
  axios
    .get(`https://api.ibeng.tech/api/search/xnxxdl?url=${link}&apikey=tamvan`)
    .then((res) => {
      let data = res.data.result;
      console.log(data);
      try {
        bot.telegram.sendVideo(ctx.chat.id, data.url, {
          caption: `judul: ${data.title} \nviews: ${data.views} \nquality: ${data.quality}`,
        });
      } catch (error) {
        console.log(error);
      }
    });
}

module.exports = {
  getFacebook,
  getTiktok,
  getPln,
  getYoutube,
  getXsearch,
  getXvid,
  getXnsearch,
  getXnvid,
  getInstagram,
  getImgai,
};
