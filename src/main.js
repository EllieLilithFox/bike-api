import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import { getStolenBikes } from "./bike-service.js"

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
      data.bikes.forEach(function(element){
        $(".output").append(`<p>${element.title}</p>`);
      });
    });
  });
});

