AGO.Galaxy={status:0,enabled:!1,improve:!1,direction:1,Data:{},Task:{},Messages:function(a,e){"Action"===a?AGO.Galaxy.Action(e):"Display"===a?AGO.Galaxy.Display(e):"sendShips"===a&&AGO.Galaxy.sendShips(e)},Run:function(){AGO.Option.is("G40")&&!AGO.App.OgameMobile&&(AGO.Galaxy.enabled=!0,AGO.Galaxy.improve=AGO.Option.is("G41"),AGO.Galaxy.shrink=AGO.Option.get("G42",2),AGO.Galaxy.status=5,AGO.Galaxy.Show(),document.getElementById("galaxytable")&&AGO.Galaxy.Content())},onKeydown:function(a){if(13===a.keyCode&&!a.cached)return AGO.Galaxy.direction=0,12===a.inputType&&document.activeElement.blur(),DOM.click("#galaxytableHead #showbutton"),!1;if(12!==a.inputType&&!a.cached){if(32===a.keyCode&&AGO.Option.is("U33"))return-1===AGO.Galaxy.direction?DOM.click("#solarscroll .backGalaxy"):1===AGO.Galaxy.direction?DOM.click("#solarscroll .forwardGalaxy"):DOM.click("#galaxytableHead #showbutton"),!1;if(37===a.keyCode&&(AGO.Galaxy.direction=-1),39===a.keyCode&&(AGO.Galaxy.direction=1),65===a.keyCode)return DOM.click("#solarscroll .backGalaxy"),!1;if(68===a.keyCode)return DOM.click("#solarscroll .forwardGalaxy"),!1}return!0},onSwipe:function(a){AGO.App.OgameMobile||("left"===a&&DOM.click("#solarscroll .backGalaxy"),"right"===a&&DOM.click("#solarscroll .forwardGalaxy"))},Show:function(){var a;AGO.Galaxy.shrink&&DOM.extendClass("inhalt","id","ago_shrink ago_shrink_"+AGO.Galaxy.shrink),(a=STR.splitParameter(document.location.search))&&(a.galaxy&&(AGO.Galaxy.Task.galaxy=+a.galaxy||0),a.system&&(AGO.Galaxy.Task.system=+a.system||0),a.position&&(AGO.Galaxy.Task.position=+a.position||0),a.planet&&(AGO.Galaxy.Task.position=+a.planet||0)),AGO.Task.updateCoords(AGO.Galaxy.Task,1),DOM.addEventsAll("#solarscroll .forwardGalaxy, #solarscroll .backGalaxy, #showbutton > a",null,{click:AGO.Galaxy.clickArrow}),DOM.addEvents("galaxyContent","id",{click:AGO.Galaxy.click})},Content:function(){var a,e,t,l;if(a=document.getElementById("galaxytable"),console.log(AGO.Galaxy.status),AGO.Galaxy.status=5,AGO.Galaxy.status&&a&&DOM.updateAttribute(a,null,"ago-status",1,8)){if(console.log("in if content"),e=DOM.getAttribute(a,null,"data-galaxy",2),t=DOM.getAttribute(a,null,"data-system",2),AGO.Galaxy.sameSystem=e===AGO.Galaxy.Data.galaxy&&t===AGO.Galaxy.Data.system,AGO.Galaxy.Data={galaxy:e,system:t,Row:[]},AGO.Galaxy.behave=AGO.Option.is("G51")||AGO.Init.mobile?AGO.Option.is("G52")?3:AGO.isMobile?2:1:0,AGO.Galaxy.behave&&(3===AGO.Galaxy.behave&&DOM.extendClass(a,null,"ago_galaxy_espionage"),e={update:"reload",setting:{id:"G52",mode:"toggle"}},DOM.setData('th[colspan="3"]',a,e),DOM.setData("th.text_moon",a,e),(e=3===AGO.Galaxy.behave?"#008000":2===AGO.Galaxy.behave?"#656977":"")&&DOM.updateStyle('th[colspan="3"]',a,"color",e),(e=AGO.Option.is("commander")?e:2<=AGO.Galaxy.behave?"#656977":"")&&DOM.updateStyle("th.text_moon",a,"color",e)),+(e=DOM.getText("#slotValue",a,7).split("/"))[1]&&(AGO.Fleet.Set("Current",{fleets:+e[0]||0,fleetsSlots:+e[1]||0}),AGO.Init.Messages("Panel","updateTab",{tab:"Flights"})),AGO.Galaxy.improve)for(e=a.querySelectorAll("#galaxyheadbg2 th"),DOM.updateStyle(e[0],null,"width","60px"),DOM.updateStyle(e[1],null,"width","150px"),DOM.updateStyle(e[4],null,"width","160px"),DOM.before(e[0],e[1]),e=a.querySelectorAll(".row"),l=0;l<e.length;l++)t=e[l],DOM.hasChildren(t)&&(DOM.before(t.children[2],t.children[3]),DOM.before(t.children[4],t.children[5]));AGO.Galaxy.showRows(a.querySelectorAll(".row")),AGO.Galaxy.showHighlight(a.querySelectorAll(".row")),AGO.Galaxy.updateDataBase()}},showRows:function(a){var t,l,o,n,i,s,r,e,d,c,O,y,p,G,g,u;for(p=AGO.Option.get("G45",2),g=AGO.Option.is("G58"),u=0;u<a.length;u++)(y={position:u+1}).coords=AGO.Galaxy.Data.galaxy+":"+AGO.Galaxy.Data.system+":"+y.position,y.owncoords=AGO.Planets.owncoords(y.coords,1),y.coordsActive=AGO.Task.cutCoords(AGO.Panel.GetActive("Target","coords",6)),y.coordsCurrent=AGO.Galaxy.Task.coords,AGO.Galaxy.Data.Row[y.position]=y,r=s=i=n=o=l=t=void 0,DOM.iterateChildren(a[u],function(a){var e=a.className||"";HTML.hasClass(e,"allytag")?t=a:HTML.hasClass(e,"playername")?l=a:HTML.hasClass(e,"microplanet")?o=a:HTML.hasClass(e,"moon")?n=a:HTML.hasClass(e,"debris")?i=a:HTML.hasClass(e,"position")?s=a:HTML.hasClass(e,"planetname")&&(r=a)}),console.log(t),console.log(l),console.log(o),console.log(n),console.log(i),console.log(s),console.log(r),t&&(e=t.querySelector(".allytagwrapper"),G=DOM.getAttribute(e,null,"rel"),y.allianceId=STR.check(NMR.parseIntFormat(G)),console.log(y.allianceId),e&&y.allianceId&&(y.allianceTag=DOM.getTextChild(e,null,7),y.allianceOwn=HTML.hasClass(e.className,"status_abbr_ally_own")?41:0,y.allianceColor=AGO.Token.getClass(AGO.Galaxy.getToken("Alliance",y.allianceId)||y.allianceOwn),y.allianceColor&&DOM.addClass(t,null,y.allianceColor),d=e.querySelector(".htmlTooltip"),c=e.querySelector(".htmlTooltip .ListLinks"),d&&c&&(y.allianceName=DOM.getText("h1",d,7),y.allianceRank=DOM.getText(".rank a",c,2),y.allianceMember=DOM.getText(".members",c,2),O={tab:"Alliance",id:y.allianceId,name:y.allianceName,tag:y.allianceTag},DOM.setData(c,null,O),AGO.Option.is("G44")&&(c=DOM.appendA(null,{class:"ago_galaxy_rank",href:DOM.getAttribute(".rank a",c,"href")}),O=("ago_galaxy_rank "+y.allianceColor).trim(),DOM.appendSPAN(c,O,y.allianceRank+"/"+y.allianceMember),DOM.appendChild(t,c)),g||(DOM.setAttribute(e,null,"rel",G+String.fromCharCode(65+y.position)),DOM.setAttribute(d,null,"id",G+String.fromCharCode(65+y.position)))))),l&&!y.owncoords&&(e=l.querySelector("a.tooltipRel"),G=DOM.getAttribute(e,null,"rel"),y.playerId=STR.check(NMR.parseIntFormat(G)),e&&y.playerId&&(y.playerBuddy=DOM.hasClass(s,null,"status_abbr_buddy")?51:0,y.playerColor=AGO.Token.getClass(AGO.Galaxy.getToken("Player",y.playerId)||y.playerBuddy)||y.allianceColor,y.playerStatus=AGO.Token.getPlayerStatus(".status > span",l)||21,d=l.querySelector(".htmlTooltip"),c=l.querySelector(".htmlTooltip .ListLinks"),d&&c&&(y.playerName=DOM.getText("h1 span",d,7),y.playerRank=DOM.getText(".rank a",c,2),O={message:{page:"Token",role:"Action",data:{action:"set",tab:"Player",token:81,id:y.playerId,name:y.playerName}}},DOM.setData(e,null,O),O={tab:"Player",id:y.playerId,name:y.playerName},DOM.setData(c,null,O),AGO.Option.is("G43")&&(c=DOM.appendA(null,{class:"ago_galaxy_rank",href:DOM.getAttribute(".rank a",c,"href")}),O=("ago_galaxy_rank "+y.playerColor).trim(),O=DOM.appendSPAN(c,O,1e4<=y.playerRank?"10 k":y.playerRank),DOM.appendChild(AGO.Galaxy.improve?l.nextElementSibling:l,c)),g||(DOM.setAttribute(e,null,"rel",G+String.fromCharCode(65+y.position)),DOM.setAttribute(d,null,"id",G+String.fromCharCode(65+y.position)))))),G=2!==AGO.Galaxy.behave&&!y.allianceOwn&&!y.playerBuddy&&VAL.check(y.playerStatus,21,22,23,26,27,28),o&&(y.planetId=DOM.getAttribute(o,null,"data-planet-id",7),y.planetId&&(d=o.querySelector(".htmlTooltip"),c=o.querySelector(".htmlTooltip .ListLinks"),d&&c&&(y.planetName=DOM.getText("h1 span",d,7),o.querySelector(".activity")&&(y.planetActivity=DOM.getText(c.firstElementChild,null,2)||1)),y.owncoords||(O={tab:"Target",id:y.planetId,name:y.playerName,coords:y.coords+":1"},DOM.setData(c,null,O),G&&(3===AGO.Galaxy.behave&&DOM.extendClass(o,null,"ago_galaxy_espionage"),DOM.setAttribute(o,null,"onclick","sendShips(6,"+y.coords.replace(/:/g,",")+",1,0,0,this); return false;"))))),n&&(y.moonId=DOM.getAttribute(n,null,"data-moon-id",7),y.moonId&&(d=n.querySelector(".htmlTooltip"),c=n.querySelector(".htmlTooltip .ListLinks"),d&&c&&(y.moonName=DOM.getText("h1 span",d,7),n.querySelector(".activity")&&(y.moonActivity=DOM.getText(c.firstElementChild,null,2)||1)),y.owncoords||(O={tab:"Target",id:y.planetId,name:y.playerName,coords:y.coords+":3"},DOM.setData(c,null,O),G&&3===AGO.Galaxy.behave&&DOM.extendClass(n,null,"ago_galaxy_espionage"),AGO.Option.is("commander")&&(e=n.querySelector("a[onclick]"),G&&(d=DOM.getAttribute(e,null,"onclick",7).split(");").join(",0,this);"),DOM.setAttribute(n,null,"onclick",d)),DOM.removeAttribute(e,null,"onclick"))))),i&&(O=i.querySelectorAll(".debris-content"),y.debrisMetal=DOM.getText(O[0],null,2),y.debrisCrystal=DOM.getText(O[1],null,2),y.debrisResources=y.debrisMetal+y.debrisCrystal,y.debrisResources)&&(y.highlightDebris=NMR.isGreater(y.debrisResources,AGO.Token.getLimit(95))?95:NMR.isGreater(y.debrisResources,AGO.Token.getLimit(94))?94:0,(e=i.querySelector("a.tooltipRel img"))&&(1===p?(d=Math.max(2+3*(y.debrisResources+"").length-AGO.Galaxy.shrink,14),d=Math.min(d,[30,28,26,24][AGO.Galaxy.shrink]),DOM.set(e,null,{width:d,height:d}),y.highlightDebris&&DOM.set(e,null,{src:HTML.urlImage("galaxy_debris.gif")})):1<p&&(O=("ago_galaxy_debris "+AGO.Token.getClass(y.highlightDebris)).trim(),c=DOM.appendDIV(null,O),O=y.highlightDebris?"ago_text_background":"",(O=DOM.appendSPAN(c,O)).innerHTML=(3!==p||AGO.Galaxy.sameSystem?STR.formatNumber(y.debrisMetal):STR.shortNumber(y.debrisMetal,0))+"<br/>"+(3!==p||AGO.Galaxy.sameSystem?STR.formatNumber(y.debrisCrystal):STR.shortNumber(y.debrisCrystal,0)),DOM.setStyleDisplay(e),DOM.appendChild(e.parentNode,c),AGO.Galaxy.improve&&DOM.addClass(i,null,"ago_galaxy_debris_shadow"))),y.owncoords||(O={tab:"Target",id:y.planetId,name:y.playerName,coords:y.coords+":2"},DOM.setData(".htmlTooltip .ListLinks",i,O))),y.planetId&&(DOM.addClass(a[u],null,"ago_galaxy_row"),y.positionColor=AGO.Token.getClass(AGO.Galaxy.getToken("Target",y.planetId))||y.playerColor,y.positionColor&&DOM.addClass(s,null,y.positionColor),r&&(y.positionColor?(DOM.addClass(r,null,y.positionColor),DOM.addClass("a",r,y.positionColor),DOM.addClass("span",r,y.positionColor)):AGO.Option.is("CT0")&&DOM.addClass("a",r,"ago_color_bright")));e=c=O=e=null},updateDataBase:function(){var a,e,t;for(e={Player:{},Planet:{}},t=1;t<AGO.Galaxy.Data.Row.length;t++)(a=AGO.Galaxy.Data.Row[t]).playerId?(e.Player[a.playerId]={I:+a.playerId,N:a.playerName,s:a.playerStatus},a.allianceId&&(e.Player[a.playerId].aI=+a.allianceId),e.Planet[a.coords]=a.moonId?{I:+a.playerId,pI:+a.planetId,pN:a.planetName,c:a.coords,mI:+a.moonId,mN:a.moonName}:{I:+a.playerId,pI:+a.planetId,pN:a.planetName,c:a.coords}):e.Planet[a.coords]=null;AGB.message("DataBase","Set",{keyUni:AGO.App.keyUni,data:e})},Display:function(a){var e;(e=document.getElementById("galaxytable"))&&(a&&"update"===a.update?(a=e.querySelectorAll(".row"),AGO.Galaxy.showHighlight(a,"update")):DOM.click("#galaxytableHead #showbutton"))},showHighlight:function(a,e){var t,l,o,n,i,s,r,d,c,O,y;if(n=AGO.Task.cutCoords(AGO.Panel.GetActive("Target","coords",6)),i=AGO.Galaxy.Task.coords,OBJ.is(a)&&OBJ.is(AGO.Galaxy.Data.Row))for(o=0;o<a.length;o++)((t=AGO.Galaxy.Data.Row[o+1]).planetId||t.debrisResources)&&(e&&(O=a[o],y=null,DOM.updateStyle(O,y,"backgroundColor","inherit"),DOM.updateStyle(O,y,"opacity","inherit"),DOM.removeClass(O,y,"ago_highlight"),DOM.setClassGroup(a[o],null,"ago_selected")),(l=(l=!t.coords||t.coords!==n&&t.coords!==i?t.playerId&&t.playerId===AGO.Panel.GetActive("Player","id",6)?"SB":"":"SA")&&AGO.Token.getColor(l)?l:"")&&DOM.extendClass(a[o],null,AGO.Token.getClassSelected(l)),t=AGO.Token.getColorOpacity(AGO.Galaxy.highlight(t)),s=a[o],r=null,c=l,(d=t)&&("string"==typeof d?(DOM.addClass(s,r,"ago_highlight"),DOM.updateStyle(s,r,"backgroundColor",d)):c||DOM.updateStyle(s,r,"opacity",d)))},highlight:function(a){function e(a,e,t,l){var o,n;return(o=AGO.Token.getCondition(e))&&(n=AGO.Token.getLimit(e),n=1===o&&!l||2===o&&NMR.isLesser(a.allianceRank,n)||5===o&&"Player"===t||6===o&&NMR.isLesser(a.playerRank,n)||10===o&&"Target"===t||13===o&&NMR.isGreater(a.debrisResources,n)||16===o&&(NMR.isLesser(a.planetActivity,n)||NMR.isLesser(a.moonActivity,n))),n?e:0}var t;return OBJ.is(a)&&(AGO.Option.is("CE0")&&(t=e(a,99,"",!0)||e(a,96,"",!0)||e(a,98,"",!a.planetActivity&&!a.moonActivity)||e(a,97,"",!a.planetActivity&&!a.moonActivity)||e(a,95,"",!a.debrisResources)||e(a,94,"",!a.debrisResources)||0),!t&&AGO.Option.is("CT0")&&(t=e(a,AGO.Galaxy.getToken("Target",a.planetId),"Target")||e(a,AGO.Galaxy.getToken("Player",a.playerId),"Player")||e(a,a.playerBuddy,"Player")||e(a,a.playerStatus,"Player")||e(a,AGO.Galaxy.getToken("Alliance",a.allianceId),"Alliance")||e(a,a.allianceOwn,"Alliance"))),t||0},getToken:function(a,e){return a&&e&&AGO.Token.Data[a]&&AGO.Token.Data[a][e]&&+STR.check(AGO.Token.Data[a][e]).split("|")[0]||0},Tooltip:function(a){var e;(a=document.querySelector('#galaxytable .tooltipRel[ago-tooltip="'+a+'"]'))&&((a=(a="TD"===a.nodeName?a:a.parentNode).querySelector(".galaxyTooltip .ListLinks"))&&((e=DOM.getData(a,null,1)).tab&&(a.addEventListener("click",AGO.Galaxy.click,!1),AGO.Galaxy.appendTooltipToken(a,e),AGO.Galaxy.appendTooltipSearch(a,e))))},appendTooltipToken:function(a,l){function e(a){var e,t;AGO.Token.getColor(a)&&((e=OBJ.create(l)).action=n===a?"remove":"set",e.token=a,t=AGO.Token.getClass(a)+(n===a?" ago_selected":""),DOM.appendA(DOM.appendLI(o),t,null,{message:{page:"Token",role:"Action",data:e}}).textContent=AGO.Token.getLabel(a))}var o,n,t;if(a&&OBJ.is(l)){if(o=document.createDocumentFragment(),DOM.appendDIV(o,"splitLine"),DOM.appendA(DOM.appendLI(o),null,null,{message:{page:"Token",role:"Action",data:{action:"set",tab:l.tab,token:81,id:l.id,name:l.name,tag:l.tag,coords:l.coords}}}).textContent=AGO.Label.get("DT1"),DOM.append(o,"li",null,{lineHeight:"6px"}).textContent=" ",AGO.Option.is("CT0")){if(n=AGO.Galaxy.getToken(l.tab,l.id),"Alliance"===l.tab)for(t=42;t<50;t++)e(t);if("Player"===l.tab){for(t=52;t<60;t++)e(t);DOM.append(o,"li",null,{lineHeight:"6px"}).textContent=" "}if("Player"===l.tab||"Target"===l.tab)for(t=61;t<80;t++)e(t)}a.appendChild(o)}},appendTooltipSearch:function(a,e){var t,l,o;if(AGO.Option.is("T00")&&e.id&&("Alliance"===e.tab||"Player"===e.tab)){for(t=document.createDocumentFragment(),DOM.appendDIV(t,"splitLine"),o=0;o<AGO.Tools.List.length;o++){var n="T1"+AGO.Tools.List[o],i=void 0,s=void 0;AGO.Option.is(n)&&(l=!0,i={message:{page:"Tools",role:"Action",data:{id:n,Search:OBJ.create(e)}}},s=AGO.Option.getPair(n)[0]||AGO.Label.get(n),DOM.appendA(DOM.appendLI(t),"",null,i).textContent=s)}l&&a.appendChild(t)}},getActivityTooltip:function(){return""},getDebrisTooltip:function(){return""},get:function(a,e){if(e){if(!a)return AGO.Galaxy.Data[e]||0;if(OBJ.is(AGO.Galaxy.Data.Row)&&OBJ.is(AGO.Galaxy.Data.Row[a]))return AGO.Galaxy.Data.Row[a][e]}return 0},Action:function(e){var a,t,l,o;a=AGO.Galaxy.Data,AGO.Galaxy.status&&a&&OBJ.get(e,"id")&&(l={Alliance:"allianceId",Player:"playerId",Target:"planetId"}[e.tab],OBJ.iterateArray(a.Row,function(a){OBJ.get(a,l)===e.id&&(o="update")}),"Target"===e.tab&&(AGO.Galaxy.Task={},t=AGO.Galaxy.Task,AGO.Task.cutSystem(e.id)===a.galaxy+":"+a.system&&(o="update"),"set"===e.action||"select"===e.action)&&(o="update",AGO.Task.updateCoords(t,4,e),t.galaxy&&t.galaxy!==a.galaxy&&(o="reload",DOM.setValue("galaxy_input","id",t.galaxy)),t.system&&t.system!==a.system&&(o="reload",DOM.setValue("system_input","id",t.system))),o&&(o=80<e.token?o:"set"===e.action||"remove"===e.action?"reload":o,AGO.Galaxy.Display({update:o})))},click:function(a){var e;a&&a.target&&a.currentTarget&&(DOM.click(".close-tooltip",a.currentTarget.parentNode.parentNode.parentNode),(e=DOM.getData(a.target,null,2)).setting&&("toggle"===e.setting.mode&&(e.setting.value=!AGO.Option.get(e.setting.id,1)),AGO.Option.set(e.setting.id,e.setting.value,1)),e.message&&("Tools"===e.message.page&&OBJ.set(e.message.data,"shiftKeys",a.shiftKey||a.ctrlKey),AGO.Init.Messages(e.message.page,e.message.role,e.message.data)),e.update&&AGO.Galaxy.Display(e))},clickArrow:function(a){a&&a.currentTarget&&(AGO.Galaxy.direction="showbutton"===a.currentTarget.parentNode.id?0:DOM.hasClass(a.currentTarget,null,"backGalaxy")?-1:1)},sendShips:function(a){var e,t;e=AGO.Fleet.Get("Current","fleets"),t=AGO.Fleet.Get("Current","fleetsSlots"),DOM.setStyleColor("#galaxytable #slots",null,"start"===a.mode?"#FF4B00":t&&t<=e?"#D43635":"#00B000")}};