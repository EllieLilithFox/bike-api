import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import { getStolenBikes } from "./bike-service.js";

function pastWeek(days) {
  let today = new Date();
  let result = new Date().setDate(today.getDate() - days);
  return Math.floor(result/1000);
}

$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();
    let city = $("#city").val();
    let state = $("#state").val();
    let zip = $("#zip").val();
    let days = parseInt($("#days").val());
    let address;
    if(zip) {
      address = zip;
    } else {
      address = `${city}, ${state}`;
    }

    getStolenBikes(address).then((data) => {
      data.bikes.forEach(function(element){
        if(element.date_stolen > pastWeek(days) && element.thumb) {
          $(".output").append(`<div class="flexbox">
          <p>${element.title}</p>
          <img src="${element.thumb}">
          <p>Frame colors: ${element.frame_colors.join(", ")}</p>
          <p>Serial: ${element.serial}</p>
          <p>URL for bike owner: <a href="${element.url}">Link</a></p>
          <p>Stolen Location: ${element.stolen_location}</p>
          </div>`);
        }
      });
    });

    $("#city").val("");
    $("#state").val("");
    $("#zip").val("");
  });
});

