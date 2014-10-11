rtrss.gate107.com
=================

node.js Prototyp (basierend auf feedsub &amp; socket.io) live zu sehen bei http://www.rtrss.gate107.com


Das ist nur ein quick & dirty Prototyp um sowas ähnliches wie ein realtime-rss feedreader zu realisieren. Ich benutzen das node-js package feedsub um damit ein paar rss-quellen in regelmässigen Abständen zu parsen und die neue Artikel an Verbundene clients zu "pushen". Die feedqueue der der node.js-app dient dabei als Buffer um neuen clients eine auswahl der aktuellsten rss-artikel initial zu liefern. 

Node.js dient dabei als Server-Komponenten, wohingegen der "Client" klassich als Webseite mittels Apache oder sonst irgendeinem Webserver zur verfügung gestellt wird. Im Client wird mittels socket.io eine Verbindung zur Server-Komponente (node.js) hergestellt.
