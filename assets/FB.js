
  window.fbAsyncInit = function() {
    FB.init({
      appId            : 'app_id',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.2'
    });

    


  };

  (function(d, s, id ){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }



  FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
});



  function setElements(isLoggedIn)
  {
        if (isLoggedIn)
        {
            document.getElementById("profile").style.display = 'block';
            document.getElementById("logout").style.display = 'block';
            document.getElementById("fb-btn").style.display = 'none';
            document.getElementById("heading").style.display = 'none';
            document.getElementById("feed").style.display = 'block';



        } else {
            document.getElementById("profile").style.display = 'none';
            document.getElementById("logout").style.display = 'none';
            document.getElementById("fb-btn").style.display = 'block';
            document.getElementById("heading").style.display = 'block';
            document.getElementById("feed").style.display = 'none';


        }
  }

    function logout(){
        FB.logout(function(response){
            statusChangeCallback(response);
        });
        setElements(false);

    }

  function statusChangeCallback(response){
      if (response.status === 'connected')
      {
          console.log('connected and authenticated');
          setElements(true);
          testApi();
      }
      else
      {
          console.log("Not authenticated");
          setElements(false);
      }
  }


  function testApi()
  {
      FB.api('me?fields=id,name,email,picture', function(response){
          if (response && !response.error){
            buildProfile(response);
        }
      });


      FB.api('/me/feed?fields=full_picture,message,description', function(response){
        if (response && !response.error){
            buildFeed(response);
            
        }
        else{
            console.log("error feed");
        }


      });
  }
function buildFeed(feed){
    var output = ` <h3>Your Top feeds  </h3>`;

    for (let i in feed.data){

        
        output += ` <h3> POST  </h3> <br> <div class ="well"> `;

        if (feed.data[i].message){
            output += `
               
                
               ${feed.data[i].message}
              
            ` ;
           


        }
        else if (feed.data[i].description){
            output +=  `${feed.data[i].description}`;
        }

        if (feed.data[i].full_picture){

               output += `<br> <img  src = '${feed.data[i].full_picture}'>`;
               output += ` </div>`;
        }
        else {
            output += ` </div>`;
        }

    }
        
        console.log(output);
    document.getElementById('feed').innerHTML=output;

}


function buildProfile(response){

    

    let profile = ` 

     <h3> Welcome ${response.name}  </h3>
     
     <ul class= "list-group">
     <li class= "list-group-items"> User Id : ${response.id} </li>
     <li class= "list-group-items">  email : ${response.email} </li>
     <li class= "list-group-items">  name : ${response.name} </li>

     </ul>



    `;
    document.getElementById('profile').innerHTML=profile;
    console.log(response);
}
