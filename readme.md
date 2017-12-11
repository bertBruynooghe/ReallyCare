# ReallyCare

The vision of this project is to make use of a cgm of an undisclosed brand, and improve the accompanying software. In first phase, it will be more of a test platform, and stuff will not be stable. 

The first phase is to wrap the caregivers website in a new webapp, which is browser agnostic and also works well when when the webapp is put on the homescreen of a mobile device (which is not the (always) the case for the original app.)

## Other shortcomings to fix
- (simple?) caregivers have no access to historical data, nor to manual BG values, MEAL values, INSULIN values
- SMS alerts are depending on 3G/4G connection of the receiver device
- cannot add markers retroactively
- it should be possible to input carb grams from another application/extension

## Work log
- found out that the XHR request to `patient/connect/ConnectViewerServlet?cpSerialNumber=NONE&msgType=last24hours&requestTime=1510242271693` actully reveals more information that is available in the GUI
- tried using the 'mechanize' gem, but couldn't get it working
- Tried to login in using Selenium IDE on Firefox (had to downgrade my Firefox); got that working: 
<table>
<tr>
	<td>open</td>
	<td>/patient/entry.jsp?bhcp=1</td>
	<td></td>
</tr>
<tr>
	<td>type</td>
	<td>id=j_username</td>
	<td>******</td>
</tr>
<tr>
	<td>type</td>
	<td>id=j_password</td>
	<td>******</td>
</tr>
<tr>
	<td>clickAndWait</td>
	<td>id=loginButton</td>
	<td></td>
</tr>
</table>
- got the grab working in casperjs, `dotenv -f .env casperjs caspertest.js`
- got a basic scenario working in node.js
- start local development using `fn start web=1` to reuse Procfile
- discovered that more or less the same functionality is delivered on Nightscout's miniMed plugin. Maybe I should integrate with that and fork later on, but for now, I just copied the thing.
- MiniMed plugin does not consider insulin or carbs, but they can be retrieved through the GUI in the csv reports, but only for complete days (not today). But we already know the events, so we can show those in Nightscout

## TODO

* check how long a session is valid, and see if we can keep the session open all the time
* authentication; if possible reuse the username/login of the original app
* authentication: remember me?
* d3
* introduction of express.js


## References

* http://ruby.bastardsbook.com/chapters/web-crawling/
* https://www.distilled.net/resources/web-scraping-with-ruby-and-nokogiri-for-beginners/

