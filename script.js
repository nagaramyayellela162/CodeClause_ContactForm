(function(){
    // adding different fonts into a list for captcha generation
    const fonts=["cursive","sans-serif","serif","monospace"];
    // taking captchaValue intially as empty
    let captchaValue="";
    //generating captcha using random method
    function generateCaptcha(){
        let value=btoa(Math.random()*1000000000);
        value=value.substring(0,5+Math.random()*5);
        captchaValue=value;
    }
    //setting generated captcha value into required format.
    function setCaptcha(){
        let html = captchaValue.split("").map((char)=>{
            const rotate= -20+ Math.trunc(Math.random()*30);
            const font=Math.trunc(Math.random()*fonts.length);
            return `<span
            style="
                transform:rotate(${rotate}deg);
                font-family:${fonts[font]};
                font-size:23px;
            "
            >${char}</span>`;
        }).join("");
        document.querySelector(".contact-form .captcha .preview").innerHTML=html;
    }
    //generating captcha after clicking referesh button
    function initCaptcha(){
        document.querySelector(".contact-form .captcha .captcha-refresh").addEventListener("click",function(){
            generateCaptcha();
            setCaptcha();
        });
        generateCaptcha();
        setCaptcha();
    }
    initCaptcha();
    //submitting the form by checking captcha that was generated and captcha that user entered.
    document.querySelector(".contact-form #submit-btn").addEventListener("click",function(){
        let inputCaptchaValue=document.querySelector(".contact-form .captcha input").value;
        if(inputCaptchaValue === captchaValue){
            swal("","Mail sent","success");
            form.reset()
            
        }
        else{
            swal("Invalid captcha");
        }
    })

})();

//adding ajax code from formspree so that our webpage will not directs to formspree page after submission.

var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)