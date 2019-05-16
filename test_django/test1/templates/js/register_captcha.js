var code;
function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha1').innerHTML = "";
  var charsArray =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  canv.style.backgroundColor = '#FFA500';

  var ctx = canv.getContext("2d");
  // ctx.font = "25px Georgia";

  ctx.font = "25px Verdana";
  // Create gradient
  var gradient = ctx.createLinearGradient(0, 0, canv.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // Fill with gradient
  ctx.fillStyle = gradient;
  // ctx.fillText("Big smile!", 10, 90);
  ctx.shadowBlur = 4;

  ctx.fillText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha1").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
  event.preventDefault();
  debugger
  if (document.getElementById("cpatchaTextBox1").value == code) {
    alert("Valid Captcha")
  } else {
    alert("Invalid Captcha. try Again");
    createCaptcha();
  }
}