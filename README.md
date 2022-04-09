# Single-Page-WebApp with Vue.js

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Einige Kommentare zu dem Projekt

Nutzt man Vuex muss der Entwickler beziehungsweise das Entwicklerteam mit der Flux-Architektur vertraut sein. Dies ist nicht immer gegeben, da vor allem auch im Bereich der Softwareentwicklung häufig auf Architekturen wie MVC, MVP, MVVM gesetzt wird. So basiert auch Vue grundsätzlich auf dem MVVM-Architekturmuster.
Des Weiteren ist durch die Verwendung von Vuex von Beginn an mehr Code notwendig und die Komplexität der Anwendung steigt ebenfalls. Hierbei ist es nur wenig relevant, ob man die Vuex-Funktionalitäten vollkommen ausnutzt oder nicht. Dadurch ergibt sich, dass unerfahrene oder in diesem Genre neue Entwickler unter Umständen eine längere Einarbeitungszeit benötigen.
Aus diesen Gründen sollte stets vor Start der Umsetzung die Nutzung von Vuex abgewogen werden. Eine nachträgliche Änderung ist immer möglich, wodurch jedoch je nach Anwendungsgröße ein erheblicher Aufwand entstehen kann. Verwendet man Vuex kann man jedoch weiterhin den primitiven Ansatz weiterverwenden, deshalb ist ein Wechsel jederzeit umsetzbar.
Da die Einkaufszettel-Web-App in die drei Hauptansichten gegliedert ist, die auch logisch nicht direkt miteinander agieren müssen, ergibt sich an dieser Stelle noch kein Grund Vuex einzusetzen. Um eine leichtere Bedienung zu ermöglichen ist es des Weiteren sinnvoll den Speichervorgang der Daten in den Web Storage zu automatisieren. Somit wird es ebenfalls möglich Daten zwischen den Hauptansichten, nach Persistierung und somit sichergestellter Konsistenz, auszutauschen. Als letzten Punkt muss noch betrachtet werden, wie mit dem Durchreichen der Daten in der Komponentenhierarchie umzugehen ist. Hierzu nachfolgend grafisch die Komponentenhierarchie dargestellt.
Die Daten müssen je nur zwischen zwei Ebenen kommuniziert werden müssen, wenn man davon ausgeht, dass im Einstiegspunkt keinerlei weiterer Code enthalten ist, als der notwendige um die Komponenten zu laden. Ein Durchreichen ohne Verwendung der Daten ist demnach in keinem Fall notwendig.
Aus diesen Gründen ergibt sich, dass die Anwendung von der Komplexität her bei Weitem noch nicht von den Möglichkeiten von Vuex umfangreich profitieren könnte und sich momentan vor allem ein Mehraufwand ergeben würde. Deshalb wird in diesem Projekt auf die Verwendung von Vuex verzichtet.

### Einkaufszettel-Filter statt Relation zwischen den Listen
Um Produkte einem Einkaufszettel zuzuordnen gibt es im Wesentlichen zwei allgemein bekannte Ansätze. Zum einen kann eine Relation zwischen den beiden Listen hergestellt werden, was in diesem Fall eine n zu m Beziehung wäre, wodurch eine weitere Liste zur Zuordnung notwendig wäre. Dieser Ansatz ist in relationalen Datenbanken eine gängige Verknüpfung von Daten. Allerdings bedeutet dies auch, dass es sich um manuellen Aufwand handelt, da der Benutzer die Zuordnung aktiv vornehmen muss.
Zum anderen kann die Auswahl der Produkte durch einen Filter geschehen. Hierbei kann auch eine n zu m Beziehung verwirklicht werden, in diesem Fall ist jedoch keine Liste zur Zuordnung notwendig, da keine explizite Bindung zwischen den Listen besteht. Die Zuordnung ist demnach lose und dadurch sehr dynamisch, wodurch sich ein erheblicher Vorteil für den Benutzer ergibt. Dieser Vorteil besteht darin, dass die Produkte durch die Angabe eines Filters dynamisch zugeordnet werden. Hierdurch ergibt sich eine deutliche Entlastung bei der Auswahl der Produkte für den Benutzer, da die zum Filter passenden Produkte automatisch für den Einkaufszettel aktiviert werden.

### Regex bei Einkaufszettel-Filter
Um den Filter des Einkaufszettels flexibel zu gestalten, ohne mehrere Filter hintereinander anwenden zu müssen, werden bei Textfeldern wie dem Namen Regex-Ausdrücke akzeptiert. Hierdurch kann der Benutzer feingranular Filtern, was jedoch ohne Regex-Kenntnisse ein Hindernis sein kann. Aus diesem Grund werden einfache und erfahrungsgemäß häufig benötigte Ausdrücke anhand von Beispielen zugänglich gemacht.
Umgesetzt wurde dies durch die Nutzung der match-Methode, die auf Strings angewendet werden kann. Die gesamte Filterung wird in einer Methode durchgeführt und anschließend wird die gefilterte Liste an die untergeordnete Komponente zur Anzeige weitergegeben.
Anfangs wird der ausgewählte Einkaufszettel anhand dessen id geladen, welche aus der Route ausgelesen (loi  List Of Interest) wird. Im nächsten Schritt wird durch die Produkt-Liste gegangen und jedes Produkt wird mit dem Filter des Einkaufszettels überprüft. Trifft das jeweilige Produkt auf den Filter zu, wird es in die Variable „filtered“ einbezogen. Nachdem die Produkt-Liste gefiltert wurde, wird die Variable „filtered“, die nun alle auf den Filter zutreffende Produkte enthält zurückgegeben.

### Wiederverwendung der Produkt-Tabelle-Komponente
Es handelt sich bei den Ansichten Produkt-Liste und Einkaufszettel-Ansicht um eine Liste mit sehr hoher Ähnlichkeit. Neben der Ähnlichkeit im Aussehen, basieren auch beide Listen auf derselben Datenbasis. Aus diesem Grund ist es naheliegend diese Liste in eine Komponente zu kapseln und die mögliche Interaktion mit dem Benutzer je nach Anwendungszweck anzupassen. Denn man kann erkennen, dass sich die Liste selbst lediglich in den Buttons, enthalten in jeder Zeile der Liste, unterscheidet.
Für die Unterscheidung, welche Interaktionsmöglichkeiten je bereitgestellt werden sollen, wird die Route überprüft. Durch Anwendung von „v-if“ kann gesteuert werden welche Buttons jeweils bereitgestellt werden sollen.

### State-Hoisting
State-Hoisting, oder zu Deutsch, das Heben, Hissen oder Hochziehen eines Status beschreibt, wie ein Status, also Daten oder Variablen, zwischen den Kindkomponenten und Elternkomponenten kommuniziert sowie verarbeitet werden. Hierbei soll in den Kindkomponenten keine Änderung der Daten geschehen, sondern mit lokalen Variablen gearbeitet werden, die anschließend nach oben in der Hierarchie gereicht werden. Erst in einer Komponente, die als Zentral angesehen werden kann soll entschieden werden, wie die Änderungen in den Status übernommen werden sollen.
Dieses Konzept eignet sich sehr gut für die Einkaufszettel-Anwendung, da auf Vuex verzichtet wird und die Konsistenz der Daten trotzdem gewährleistet werden soll. Auch ist es in Vue nicht ohne weiteres möglich aus einem tieferen Punkt in der Komponentenhierarchie Daten aus einer darüber liegenden Komponente zu ändern. Aus diesen Rahmenbedingungen ergibt sich ein einfaches Konzept, nämlich, dass die Listen aus dem Web Storage geladen werden, dies jedoch ausschließlich von den Komponenten der zweiten Ebene geschehen darf. Des Weiteren sollen die Komponenten lediglich die für ihren Zweck vorgesehen Daten verarbeiten. Diese Komponenten geben anschließend die Daten an die dritte Ebene bei Bedarf weiter, welche in lokalen Variablen die Änderungen aufnehmen und lediglich Plausibilitätsprüfungen der vom Benutzer bereitgestellte Daten durchführen. Nach Bestätigung des Benutzers und erfolgreicher Validierung werden die Daten eine Ebene nach oben emittiert, wo nun entschieden wird, wie die Daten in den zentralen Status einfließen. Somit enthält die zweite Hierarchieebene die Logik um die Daten zentral zu verwalten und zu persistieren. Die Komponenten der zweiten Hierarchieebene können die Daten dadurch nicht ohne Persistierung im Web Storage untereinander austauschen. Hierdurch wird die Persistierung und Konsistenz der Daten zwischen den Komponenten zu einem gewissen Grad erzwungen.
Im Bereich der Einkaufszettel-Anzeige werden beide Listen verwaltet. In den anderen beiden Bereichen werden lediglich die zum Bereich gehörige Liste verwaltet.

