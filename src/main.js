import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import { getStolenBikes } from "./bike-service.js";

function pastWeek() {
  let today = new Date();
  let result = new Date().setDate(today.getDate() - 7);
  return Math.floor(result/1000);
}

$(document).ready(function() {
  $("form").submit(function(event){
    event.preventDefault();
    let city = $("#city").val();
    let state = $("#state").val();
    let zip = $("#zip").val();
    let address;
    if(zip) {
      address = zip;
    } else {
      address = `${city}, ${state}`;
    }

    getStolenBikes(address).then((data) => {
      console.log(data.bikes[0].title);
      console.log(Date.now(), pastWeek());
      data.bikes.forEach(function(element){
        if(element.date_stolen > pastWeek()) {
          $(".output").append(`<p>${element.title} - ${element.url}</p>`);
        }
      });
    });
  });
});

