# Name: Value
# Referer: https://carelink.minimed.eu/patient/entry.jsp
# Host: carelink.minimed.eu
# Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
# Connection: keep-alive
# Accept-Encoding: gzip, deflate
# Accept-Language: en-us
# DNT: 1
# User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5
# Cookie: JSESSIONID=mJxyhG4Y4vnjHzwvYp3z9XH3Ql7PffcS3Bw1dFLpQQsyLRnczNnJ!-1549998723!-113827532; bhCookieSess=1; bhResults=bhcd=24&bhsh=900&bhsw=1440&bhiw=1315&bhih=326&bhtz=1&bhlu=en-us; mobileMode=false; locale=nl_BE; /carelink/usingCookies=nl_BE; Pro-683720999=YYYYYYNNNNNNN; dtCookie=58B9FF21B608155435AB0EBC9797C1CF|Y2FyZWxpbmsubWluaW1lZC5ldXwx; dtLatC=1; dtPC=58905218_836h1; dtSa=false%7C_load_%7C1%7C_load_%7C-%7C1510258904109%7C58905218_836%7Chttps%3A%2F%2Fcarelink.minimed.eu%2Fpatient%2Fentry.jsp%7C%7C1510258905218%7C


require 'rubygems'
require 'mechanize'

agent = Mechanize.new
agent.user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5'
page = agent.get(ENV['THE_SITE'])
puts page.content_type
# pp page.forms
# my_page = page.form_with(name: 'logon') do |form|
#   pp form
#   form.j_username = ENV['USERNAME']
#   form.j_password = ENV['PASSWORD']
# end.submit
pp page
