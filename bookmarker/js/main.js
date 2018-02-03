//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookMark);

// Save Bookmark
function saveBookMark(e)
{

	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

 		if(!validateForm(siteName,siteUrl))
       {
       	 return false;
       }
	//Save the above as an array of object
	var bookmark = {

		name: siteName,
		url: siteUrl
	}

	/* Save the object to local storage - It stores only string - So we parse a json to the 
	 String and then we parse it back to a json
	
	// Local storage test  - Web storage in HTML 5
	localStorage.setItem('test','HelloWorld');
	console.log(localStorage.getItem('test'));

	//Delete from local storage
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));

    */

    	// Check if bookmark local storage is null
    	if(localStorage.getItem('bookmarks')===null)
    	{
    		// Initialize an array
    		var bookmarks = [];
    		//Save the object bookmark to local storage
    		bookmarks.push(bookmark)

    		//Set to local storage
    		localStorage.setItem( 'bookmarks', JSON.stringify(bookmarks ));
    	}

    	else
    	{
    		//Get the String from local storage and parse it to JSON
    		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    		//Save the object bookmark to local storage
    		bookmarks.push(bookmark)

    		//Set to local storage
    		localStorage.setItem( 'bookmarks', JSON.stringify(bookmarks ));
    	}	

	// Clear form after submitting
	document.getElementById('myForm').reset();

    // Re-fetch the bookmarks on the web page after adding it
    fetchBookmarks();

	//Prevent form from submitting
	e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url)
{
	//  Get the bookmark from the local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i=0;i<bookmarks.length;i++)
	{
		if(bookmarks[i].url == url) 
		{
			//Remove the url item from array (From ith iteration, remove 1 item)
			bookmarks.splice(i,1);
		}
 	}
    	//Set to local storage
    	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    	// Ref-fetch bookmarks again after deleting
    	fetchBookmarks();

}

function fetchBookmarks()
		{

			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

			//Get output ID
			var bookmarksResults = document.getElementById('bookmarksResults')

			// Each time this function is called, the bookmarksResults.innerHTML is first cleared
			bookmarksResults.innerHTML = '';

			//Loop through the bookmarks that are in local storage and  display them one by one inside a div

			//Using for loop
			for(var i = 0 ; i<bookmarks.length;i++ )
			{
				var name = bookmarks[i].name;
				var url = bookmarks[i].url;

				bookmarksResults.innerHTML += '<div class="card card-body bg-light"> '+
											  '<h3>'+name+" "+
											  '<a class = "btn btn-primary" target="_blank" href="'+url+'">Visit</a>'+ " "+
											  '<a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">Delete</a>'	
											  +'<h3>'+'</div>';

			}

		}


function validateForm(siteName,siteUrl)
{
	// Add validation to handle empty site url or site name

	if(!siteName||!siteUrl)
	{
		alert('Please fill the form');
		// To stop the application
		return false;
	}

 	//Adding regular expression for url
 	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&/=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteUrl.match(regex)) 
	{
  		alert("Please use a valid url");
  		return false;
	} 
	
	return true;

}


