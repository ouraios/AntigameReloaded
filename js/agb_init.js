if(!AGB)var AGB={};console.log("AGB INIT"),AGB.App={Data:{},Player:{},Page:{overview:{page:"Overview",js:["pages"],css:"pages"},resources:{page:"Resources",js:["pages"],css:"pages"},resourcesettings:{page:"ResourcesSettings",js:["pages"],css:"pages"},station:{page:"Station",js:["pages"],css:"pages"},traderoverview:{page:"Trader",js:["pages"],css:"pages"},research:{page:"Research",js:["pages"],css:"pages"},techtree:{page:"Techtree",js:["pages"],css:"pages"},shipyard:{page:"Shipyard",js:["pages"],css:"pages"},defense:{page:"Defense",js:["pages"],css:"pages"},fleet1:{page:"Fleet1",js:["fleet1"],css:"pages_fleet1"},fleet2:{page:"Fleet2",js:["fleet2"],css:"pages_fleet2"},fleet3:{page:"Fleet3",js:["fleet3"],css:"pages_fleet3"},movement:{page:"Movement",js:["movement"],css:"pages_movement"},galaxy:{page:"Galaxy",js:["jquery","messages","galaxy"],css:"pages_galaxy"},empire:{page:"Empire",js:["jquery","empire"],css:"pages_empire"},alliance:{page:"Alliance",js:["pages"],css:"pages"},messages:{page:"Messages",js:["jquery","messages"],css:"pages_messages"},websim:{page:"Websim",js:["simulators"],css:""},osimulate:{page:"Osimulate",js:["simulators"],css:""}},Extern:{"speedsim.net":2,"osimulate.com":2,"gamestats.org":1,"ogametools.com":1,"oraiders.com":1,"ghiroblu.com":1,"projet-alternative.fr":1,"galaxy.ddns.us":1,"logserver.net":1,"war-riders.de":1,"kb.un1matr1x.de":1,"savekb.de":1,"drago-sim.com":1,"ogniter.org":1,"infuza.com":1,"savecr.com":1},Messages:function(a,e,t,r){"Start"===a?AGB.App.Start(e,t,r):"Update"===a?AGB.App.Update(e,t):"Refresh"===a?AGB.App.Refresh(e,t):"Script"===a&&OBJ.is(e)&&AGB.Manager.loadScripts(e.scripts,r)},Check:function(a){var e,t;return a=STR.check(a).toLowerCase(),t=(a.split("//")[1]||"").split("/")[0]||"",a?(e={href:a,host:t},a.match(/https:\/\/.+\.ogame.gameforge.com\/game\/index\.php\?+.*page=*/i)?e.mode=3:OBJ.iterate(AGB.App.Extern,function(a){(t===a||-1<t.indexOf("."+a))&&(e.mode=AGB.App.Extern[a])}),e):null},Start:function(e,t,a){var r;OBJ.is(e)&&e.page&&t&&(AGB.Manager.loadScripts(OBJ.get(AGB.App.Page[e.page],"js")||["pages"],a),2===e.mode?t({Page:OBJ.get(AGB.App.Page[e.page],"page")||"Page",Label:AGB.Label.Data[e.abbrCom],Background:AGB.Background.Data}):3<=e.mode&&e.accountId&&e.keyCom&&e.keyUni&&e.keyPlayer&&AGB.Com.Check(e.abbrCom)&&e.abbrUni&&e.urlUni&&(r=e.keyPlayer,OBJ.is(AGB.App.Player[e.keyUni])||(AGB.App.Player[e.keyUni]={abbrUni:e.abbrUni,urlUni:e.urlUni}),AGB.App.Player[e.keyUni].keyPlayer=r,OBJ.is(AGB.App.Player[r])||(AGB.App.Player[r]={accountId:e.accountId,abbrCom:e.abbrCom,abbrUni:e.abbrUni,keyCom:e.keyCom,keyUni:e.keyUni,urlUni:e.urlUni}),e.reload=e.reload||1!==AGB.App.Player[r].status,AGB.App.Player[r].status=1,AGB.Core.clearTimeout(AGB.App.Player[r].timeout),AGB.App.Player[r].timeout=AGB.Core.setTimeout(function(){AGB.status&&AGB.App.Stop(r)},5e3),AGB.Data.Init(e,function(a){t({Page:OBJ.get(AGB.App.Page[e.page],"page")||"Page",reload:e.reload||a,keyPlayer:r,Option:AGB.Option.Data[r],DataBase:AGB.DataBase.Status(e),Label:AGB.Label.Data[r],Item:AGB.Item.Data[r],App:AGB.App.Data[r],Uni:AGB.Uni.Data[r],Panel:AGB.Panel.Data[r],Box:AGB.Box.Data[r],Token:"galaxy"===e.page?AGB.Token.Data[r]:AGB.Token.Data[r].Info,Units:AGB.Units.Start(r),Fleet:AGB.Fleet.Data[r],Background:AGB.Background.Data})})))},Stop:function(a){},Update:function(a,e){var t;(t=AGB.App.getPlayer(a,"copy"))&&(a.reload||2e3<AGB.Time.timestamp()-(+AGB.App.Player[t].timestampUpdate||0))&&(AGB.App.Player[t].timestampUpdate=AGB.Time.timestamp(),AGB.App.Load(a),AGB.Uni.Load(a),AGB.Label.Load(a),AGB.DataBase.Init(a),e&&e())},Refresh:function(a,e){var t;(t=AGB.App.getPlayer(a))&&e&&e({Option:AGB.Option.Data[t],Panel:AGB.Panel.Data[t],Box:AGB.Box.Data[t],Fleet:AGB.Fleet.Data[t],Background:AGB.Background.Data})},Init:function(a,e){var t,r,n;n=AGB.Data.get("App","Data","version"),(r=AGB.App.getPlayer(a,"copy"))&&(t=OBJ.parse(e[AGB.Data.getKey(r,"App","Data")]),AGB.App.Data[r]=t.version===n?t:{version:n},AGB.App.Data[r].storage=AGB.Storage.status)},Load:function(r){var n,a;(a=AGB.App.getPlayer(r,"copy"))&&((n=new XMLHttpRequest).open("POST","http://antigame.de/antigame/ago_appdata.php",!0),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.onerror=n.onload=function(){var a,e,t;e=AGB.App.getPlayer(r),a=AGB.App.Data[e],e&&a&&(a.storage=AGB.Storage.status,(t=OBJ.parse(200==+n.status?n.responseText:"")).versionFinal&&(a.versionLoca=t.versionLoca,a.versionLocaMenu=t.versionLocaMenu,a.versionUpdate=1<AGB.Config.beta?"":1===AGB.Config.beta?t.versionPreview:t.versionFinal,AGB.App.Save({player:e})),AGB.Core.Log("Update   - App      : "+a.versionUpdate+"http://antigame.de/antigame/ago_appdata.php"+(t.versionFinal?"":" - failed !"),!0))},n.send("domain=antigame.de&loca="+r.abbrCom+"&locamenu="+(AGB.Option.Get(a,"A10")||r.abbrCom)))},Save:function(a){a=AGB.App.getPlayer(a),AGB.Data.isStorage(a,"App","Data")&&OBJ.is(AGB.App.Data[a])&&AGB.Data.setStorage(a,"App","Data",AGB.App.Data[a])},Get:function(a,e,t){var r;return a&&AGB.App.Data[a]&&e&&(r=AGB.App.Data[a][e]),6===t?STR.check(r):+r||0},Set:function(a,e,t,r){a&&AGB.App.Data[a]&&t&&AGB.App.Data[a][t]!==r&&(AGB.App.Data[a][t]=r,AGB.App.Save({player:a}))},getUni:function(a){return AGB.status&&a&&a.keyUni&&AGB.App.Player[a.keyUni]?(a.keyPlayer=AGB.App.Player[a.keyUni].keyPlayer,a.abbrUni=AGB.App.Player[a.keyUni].abbrUni,a.urlUni=AGB.App.Player[a.keyUni].urlUni,a.keyUni):""},getPlayer:function(a,e){return AGB.status&&a&&a.keyPlayer&&AGB.App.Player[a.keyPlayer]&&1===AGB.App.Player[a.keyPlayer].status?(e&&(a.accountId=AGB.App.Player[a.keyPlayer].accountId,a.abbrCom=AGB.App.Player[a.keyPlayer].abbrCom,a.abbrUni=AGB.App.Player[a.keyPlayer].abbrUni,a.keyCom=AGB.App.Player[a.keyPlayer].keyCom,a.keyUni=AGB.App.Player[a.keyPlayer].keyUni,a.urlUni=AGB.App.Player[a.keyPlayer].urlUni),a.keyPlayer):""}},AGB.Background={Data:{},Messages:function(a,e){"Set"===a&&AGB.Background.Set(e)},Set:function(a){OBJ.is(a)&&a.key&&(AGB.Background.Data[a.key]=a.value||"")}},AGB.Data={Status:{},Info:{App:{Data:{storage:1,version:3,tab:2}},Uni:{Data:{storage:1,version:3,tab:2}},Option:{Data:{storage:4,version:12,upgrade:1},Local:{storage:1}},Label:{Loca:{storage:1,version:1,key:0},Api:{storage:1,version:1,key:2}},Units:{Data:{storage:2,version:2}},Fleet:{Data:{storage:2,version:2},Routine:{tab:2},Expo:{tab:2},Last:{tab:3},Cooldown:{tab:2}},Token:{Alliance:{storage:3,version:3,tab:2},Player:{storage:3,version:3,tab:2},Target:{storage:3,version:3,tab:2},Current:{storage:3,version:3,tab:2},Info:{tab:1}},Panel:{Data:{storage:2,version:1},Settings:{tab:2,label:"I10"},Account:{tab:2,label:"I20"},Flights:{tab:2,label:"I40"},Construction:{tab:2,label:"I30"},Alliance:{tab:2,label:"I60"},Player:{tab:2,label:"I70"},Target:{tab:2,label:"I80"},Tools:{tab:2,label:"I90"},Box:{tab:2},Cache:{tab:1}},Box:{Cache:{tab:1}},Construction:{Data:{storage:2,version:1}}},Messages:function(a,e,t){"Backup"===a?AGB.Data.Backup(e,t):"Restore"===a?AGB.Data.Restore(e,t):"Remove"===a?AGB.Data.Remove(e,t):"List"===a&&AGB.Data.List(e)},Init:function(r,e){var n,i;(n=AGB.App.getPlayer(r))&&(!AGB.Data.Status[n]||r.reload&&1===AGB.Data.Status[n])?(AGB.Data.Status[n]=3,i={},OBJ.iterate(AGB.Data.Info,function(t){OBJ.iterate(AGB.Data.Info[t],function(a){var e;1<=AGB.Data.Info[t][a].storage&&(e=2===AGB.Data.Info[t][a].key?r.keyCom:1===AGB.Data.Info[t][a].key?r.keyUni:n,i[AGB.Data.getKey(e,t,a)]=a)})}),AGB.Storage.Get({key:i},function(a){a=OBJ.is(a)?a:{},AGB.App.Init(r,a),AGB.Uni.Init(r,a),AGB.Option.Init(r,a),AGB.Label.Init(r,a),AGB.Units.Init(r,a),AGB.Fleet.Init(r,a),AGB.Token.Init(r,a),AGB.Panel.Init(r,a),AGB.Box.Init(r,a),AGB.Construction.Init(r,a),AGB.Item.Init(r),AGB.Data.Status[n]=1,e&&e(!0)})):e&&e(!1)},Change:function(){AGB.Core.clearTimeout(AGB.Data.changeTimeout),AGB.Data.changeTimeout=AGB.Core.setTimeout(function(){AGB.status&&AGB.Data.Save()},3e3)},Save:function(a,t){function e(a){var e;AGB.Data.isStatus(a)&&(e={keyPlayer:a,save:{}},t&&(e.backup={}),OBJ.iterate(AGB.Data.Info,function(a){AGB[a]&&"function"==typeof AGB[a].Save&&"App"!==a&&AGB[a].Save(e)}),t?AGB.Storage.Set({data:e.save},function(){t(e.backup)}):AGB.Storage.Set({data:e.save}))}AGB.App.getPlayer(a)?e(a.keyPlayer):OBJ.iterate(AGB.Data.Status,e)},Sync:function(a){var t,r,n;t=AGB.App.getPlayer(a),AGB.Data.isStatus(t)&&(n=Boolean(AGB.Option.Get(t,"D60")&&3===AGB.Option.Get(t,"D61")),(r={})[t+"_SYNC_Sync_Data"]=n,AGB.Data.iterate("",function(a,e){2<=AGB.Data.get(a,e,"storage")&&(r[t+"_SYNC_"+a+"_"+e]=n)}),AGB.Storage.Sync({sync:!0,mode:n,key:r}))},Backup:function(a,p){var e,u,g,A;e=AGB.App.getPlayer(a,"copy"),AGB.Data.isStatus(e)&&(u=a.tab,(A=OBJ.create(a)).timestamp=AGB.Time.timestamp(),A.list={},A.data={},A.timestampLocal=AGB.App.Get(e,"timestampSync"),A.data.Sync_Data={com:a.abbrCom,uni:a.abbrUni,player:a.accountId,timestamp:A.timestamp},g=3===u?4e3:2===u?1e4:3e5,AGB.Data.Save(a,function(t){var e,r,n,a,i,o,s;OBJ.iterate(t,function(a){var e;e=OBJ.parse(t[a]),STR.check(t[a]).length>g?(A.data[a]={version:0},A.data.Sync_Data[a]=1,A.list[a]=-1):(A.data[a]=e.version?e:{version:1},A.data.Sync_Data[a]=STR.hash(JSON.stringify(A.data[a])),A.list[a]=1)}),1===u?p&&p(A):2===u?(i=p,s="com="+(a=A).abbrCom+"&uni="+a.abbrUni+"&user_id="+a.accountId+"&ident="+a.ident+"&type=Sync&action=put&domain=antigame.de&string="+encodeURIComponent(JSON.stringify(a.data))+"&header="+encodeURIComponent(JSON.stringify(a.data.Sync_Data)),(o=new XMLHttpRequest).open("POST","http://antigame.de/antigame/usave/ago_sync.php",!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.onerror=o.onload=function(){i&&(a.status=200==+o.status&&7<=+o.responseText?1:-1,a.error=-1===a.status,a.data=null,a.error||AGB.App.Set(a.keyPlayer,"timestampSync",a.timestamp),i(a))},o.send(s)):3===u&&(e=A,r=p,n={},OBJ.iterate(e.data,function(a){n[e.keyPlayer+"_SYNC_"+a]=JSON.stringify(e.data[a])}),AGB.Storage.Set({sync:!0,data:n},function(a){r&&(e.status=a,e.error=-1===a,e.data=null,e.error||AGB.App.Set(e.keyPlayer,"timestampSync",e.timestamp),r(e))}))}))},Restore:function(o,t){function e(n,a){var i;i={tab:o.tab,list:{}},OBJ.is(n)&&!n.error?(i.universal=a=1===o.tab&&a,i.timestampLocal=AGB.App.Get(s,"timestampSync"),i.timestamp=+n.timestamp||0,i.com=n.com===o.abbrCom?1:n.com&&!a?-1:0,i.uni=n.uni===o.abbrUni?1:n.uni&&!a?-1:0,i.player=+n.player==+o.accountId?1:n.player&&!a?-1:0,i.status=i.timestamp?i.timestamp===i.timestampLocal?1:i.timestamp>i.timestampLocal?4:3:-1,1===o.tab?(-1===i.com&&(o.type=Math.max(o.type,3)),-1===i.uni&&(o.type=Math.max(o.type,4)),-1===i.player&&(o.type=9)):1===i.com&&1===i.uni&&1===i.player||(o.type=0),2<=o.type?AGB.Data.Save(o,function(r){AGB.Data.iterate("",function(a,e){var t;AGB.Data.get(a,e,"storage")>=o.type&&(t=a+"_"+e,i.list[t]=n[t]?1===n[t]?-1:n[t]===STR.hash(r[t])?1:2:0)}),t&&t(i)}):(i.status=-1,t&&t(i))):(i.status=-1,t&&t(i))}function n(r,a){var e,n;n={tab:o.tab,list:{},data:{}},OBJ.is(r)&&!r.error&&OBJ.is(r.Sync_Data)?(e=r.Sync_Data,n.universal=a=1===o.tab&&a,n.timestamp=+e.timestamp||0,n.com=e.com===o.abbrCom?1:e.com&&!a?-1:0,n.uni=e.uni===o.abbrUni?1:e.uni&&!a?-1:0,n.player=+e.player==+o.accountId?1:e.player&&!a?-1:0,1===o.tab?(-1===n.com&&(o.type=Math.max(o.type,3)),-1===n.uni&&(o.type=Math.max(o.type,4)),-1===n.player&&(o.type=9)):1===n.com&&1===n.uni&&1===n.player||(o.type=9),AGB.Data.iterate("",function(a,e){var t;t=a+"_"+e,AGB.Data.get(a,e,"storage")>=o.type&&1<=+OBJ.get(r[t],"version")&&(n.list[t]=1,n.data[s+"_"+t]=JSON.stringify(r[t]))}),Object.keys(n.data).length?AGB.Storage.Set({data:n.data},function(a){1===a&&AGB.App.Set(s,"timestampSync",+n.timestamp||AGB.Time.timestamp()),AGB.Data.Status[s]=0,n.status=a,n.data=null,t&&t(n)}):(n.status=0,n.data=null,t&&t(n))):(n.status=-1,t&&t(n))}var s,r,i;s=AGB.App.getPlayer(o,"copy"),AGB.Data.isStatus(s)&&(1===o.tab?"restore"===o.action?n(OBJ.parse(o.value),o.universal):e(OBJ.parse(o.value).Sync_Data,o.universal):2===o.tab?(i="com="+o.abbrCom+"&uni="+o.abbrUni+"&user_id="+o.accountId+"&ident="+o.ident+"&type=Sync&action="+("restore"===o.action?"get":"header")+"&domain=antigame.de",(r=new XMLHttpRequest).open("POST","http://antigame.de/antigame/usave/ago_sync.php",!0),r.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.onerror=r.onload=function(){var a;a=200==+r.status&&r.responseText?OBJ.parse(r.responseText):{error:!0},"restore"===o.action?n(a):e(a)},r.send(i)):3===o.tab&&((i={})[s+"_SYNC_Sync_Data"]="Sync_Data",AGB.Data.iterate("",function(a,e){2<=AGB.Data.get(a,e,"storage")&&(i[s+"_SYNC_"+a+"_"+e]=a+"_"+e)}),AGB.Storage.Get({sync:!0,key:i},function(t){var r={};OBJ.iterate(t,function(a){var e=STR.check(a).split("_SYNC_")[1];e&&(r[e]=OBJ.parse(t[a]))}),"restore"===o.action?n(r):e(r.Sync_Data)})))},List:function(a){OBJ.is(a)&&AGB.Storage.List(a)},Remove:function(a,e){var t,r,n,i;t=AGB.App.getPlayer(a,"copy"),AGB.Data.isStatus(t)&&(r=a.mode,i=(n=VAL.check(r,"acc","ago"))||!1,(n||"Account"===r)&&(i=!0,AGB.Data.removeStorageGroup(a,"App"),AGB.Data.removeStorageGroup(a,"Label"),AGB.Data.removeStorageGroup(a,"Units"),AGB.Data.removeStorageGroup(a,"Fleet"),AGB.Data.removeStorageGroup(a,"Messages")),(n||"Token"===r)&&(i=!0,AGB.Data.removeStorageGroup(a,"Token")),(n||"Panel"===r)&&(i=!0,AGB.Data.removeStorageGroup(a,"Panel"),AGB.Data.removeStorageGroup(a,"Construction")),(n||"Option"===r)&&(i=!0,AGB.Data.removeStorageGroup(a,"Option")),(n||"DataBase"===r)&&AGB.DataBase.Remove(a),"acc"===r&&AGB.Storage.RemoveFilter({filter:t}),"ago"===r&&AGB.Storage.RemoveFilter({filter:""}),i&&(AGB.Data.Status[t]=0)),e&&e(i)},removeStorageGroup:function(r,n){OBJ.is(r)&&AGB.Data.Info[n]&&AGB.Data.iterate(n,function(a,e){var t;1<=a.storage&&(t=2===a.key?r.keyCom:1===a.key?r.keyUni:r.keyPlayer,AGB.Storage.Remove({key:AGB.Data.getKey(t,n,e)}))})},setStorage:function(a,e,t,r){a&&(r=OBJ.is(r)?JSON.stringify(r):r||"",AGB.Storage.Set({key:AGB.Data.getKey(a,e,t),data:r}))},iterate:function(a,e){var t;if(AGB.Data.Info[a])for(t in AGB.Data.Info[a])AGB.Data.Info[a].hasOwnProperty(t)&&e(AGB.Data.Info[a][t],t);else if(!a)for(a in AGB.Data.Info)if(AGB.Data.Info.hasOwnProperty(a))for(t in AGB.Data.Info[a])AGB.Data.Info[a].hasOwnProperty(t)&&e(a,t)},getKey:function(a,e,t){return AGB.Data.Info[e]&&AGB.Data.Info[e][t]?a+"_"+e+"_"+t:""},get:function(a,e,t,r){return AGB.Data.Info[a]&&AGB.Data.Info[a][e]?6===r?STR.check(AGB.Data.Info[a][e][t]||""):+AGB.Data.Info[a][e][t]||0:6===r?"":0},getTab:function(a,e){return a&&a.tab&&AGB.Data.Info[e]&&AGB.Data.Info[e][a.tab]&&AGB.Data.Info[e][a.tab].tab?a.tab:""},set:function(a,e,t,r){AGB.Data.Info[a]&&AGB.Data.Info[a][e]&&(AGB.Data.Info[a][e][t]=+r||0)},isStorage:function(a,e,t){return a&&AGB.Data.Status[a]&&e&&AGB.Data.Info[e]&&AGB.Data.Info[e][t]?AGB.Data.Info[e][t].storage:0},isBackup:function(a,e,t,r){return Boolean(a&&AGB.Data.Status[a]&&e&&AGB.Data.Info[e]&&AGB.Data.Info[e][t]&&AGB.Data.Info[e][t].storage>=r)},isStatus:function(a){return a&&1===AGB.Data.Status[a]}},AGB.Com={Data:{AE:{infuzaServer:"ae.ogame.org",websim:"en",osimulate:"ae",dragosim:"english",warriders:"",infuza:"fr",ogniter:"en"},AR:{infuzaServer:"ogame.com.ar",websim:"sp",osimulate:"ar",dragosim:"spanish",warriders:"",infuza:"es",ogniter:"ar"},BA:{infuzaServer:"ba.ogame.org",websim:"ba",osimulate:"hr",dragosim:"bosnian",warriders:"",infuza:"en",ogniter:"yu"},BR:{infuzaServer:"ogame.com.br",websim:"pt",osimulate:"br",dragosim:"brazilian",warriders:"",infuza:"pt",ogniter:"br"},CZ:{infuzaServer:"ogame.cz",websim:"cz",osimulate:"cz",dragosim:"czech",warriders:"",infuza:"cs",ogniter:"cz"},DE:{infuzaServer:"ogame.de",websim:"de",osimulate:"de",dragosim:"german",warriders:"de",infuza:"de",ogniter:"de"},DK:{infuzaServer:"ogame.dk",websim:"dk",osimulate:"dk",dragosim:"danish",warriders:"",infuza:"da",ogniter:"dk"},EN:{infuzaServer:"ogame.org",websim:"en",osimulate:"en",dragosim:"english",warriders:"org",infuza:"en",ogniter:"en"},ES:{infuzaServer:"ogame.com.es",websim:"sp",osimulate:"es",dragosim:"spanish",warriders:"es",infuza:"es",ogniter:"es"},FI:{infuzaServer:"fi.ogame.org",websim:"fi",osimulate:"fi",dragosim:"english",warriders:"",infuza:"en",ogniter:"fi"},FR:{infuzaServer:"ogame.fr",websim:"fr",osimulate:"fr",dragosim:"french",warriders:"fr",infuza:"fr",ogniter:"fr"},GR:{infuzaServer:"ogame.gr",websim:"gr",osimulate:"gr",dragosim:"greek",warriders:"",infuza:"en",ogniter:"gr"},HR:{infuzaServer:"ogame.com.hr",websim:"ba",osimulate:"hr",dragosim:"english",warriders:"",infuza:"en",ogniter:"hr"},HU:{infuzaServer:"ogame.hu",websim:"hu",osimulate:"hu",dragosim:"hungarian",warriders:"",infuza:"hu",ogniter:"hu"},IT:{infuzaServer:"ogame.it",websim:"it",osimulate:"it",dragosim:"italian",warriders:"",infuza:"it",ogniter:"it"},JP:{infuzaServer:"ogame.jp",websim:"ja",osimulate:"jp",dragosim:"english",warriders:"",infuza:"en",ogniter:"jp"},MX:{infuzaServer:"mx.ogame.org",websim:"sp",osimulate:"mx",dragosim:"spanish",warriders:"",infuza:"es",ogniter:"mx"},NL:{infuzaServer:"ogame.nl",websim:"nl",osimulate:"nl",dragosim:"dutch",warriders:"",infuza:"nl",ogniter:"nl"},NO:{infuzaServer:"ogame.no",websim:"no",osimulate:"no",dragosim:"english",warriders:"",infuza:"en",ogniter:"no"},PL:{infuzaServer:"ogame.pl",websim:"pl",osimulate:"pl",dragosim:"polish",warriders:"pl",infuza:"pl",ogniter:"pl"},PT:{infuzaServer:"ogame.com.pt",websim:"pt",osimulate:"pt",dragosim:"portuguese",warriders:"",infuza:"pt",ogniter:"pt"},RO:{infuzaServer:"ogame.ro",websim:"ro",osimulate:"ro",dragosim:"romanian",warriders:"",infuza:"ro",ogniter:"ro"},RU:{infuzaServer:"ogame.ru",websim:"ru",osimulate:"ru",dragosim:"russian",warriders:"",infuza:"ru",ogniter:"ru"},SE:{infuzaServer:"ogame.se",websim:"sv",osimulate:"se",dragosim:"swedish",warriders:"",infuza:"sv",ogniter:"se"},SI:{infuzaServer:"ogame.si",websim:"si",osimulate:"si",dragosim:"english",warriders:"",infuza:"en",ogniter:"si"},SK:{infuzaServer:"ogame.sk",websim:"sk",osimulate:"sk",dragosim:"slovak",warriders:"",infuza:"en",ogniter:"sk"},TR:{infuzaServer:"tr.ogame.org",websim:"tr",osimulate:"tr",dragosim:"turkish",warriders:"",infuza:"en",ogniter:"tr"},TW:{infuzaServer:"ogame.tw",websim:"tw",osimulate:"tw",dragosim:"taiwanese",warriders:"",infuza:"en",ogniter:"tw"},US:{infuzaServer:"ogame.us",websim:"en",osimulate:"us",dragosim:"english",warriders:"us",infuza:"en",ogniter:"us"},ORIGIN:{infuzaServer:"pioneers.ogame.org",websim:"en",osimulate:"en",dragosim:"english",warriders:"",infuza:"en",ogniter:"en"}},Get:function(a,e){return a&&AGB.Com.Data[a]&&AGB.Com.Data[a][e]||""},Check:function(a){return a&&a in AGB.Com.Data}},AGB.Uni={Data:{},Info:{status:2,speed:1,speedFleet:1,galaxies:50,systems:499,positions:17,rapidFire:1,acs:1,defToTF:0,debrisFactor:.3,repairFactor:.7,newbieProtectionLimit:0,newbieProtectionHigh:0,topScore:0,name:""},Init:function(a,e){var t,r,n;n=AGB.Data.get("Uni","Data","version"),(r=AGB.App.getPlayer(a))&&(AGB.Uni.Data[r]=OBJ.create(AGB.Uni.Info),AGB.Uni.Data[r].version=n,(t=OBJ.parse(e[AGB.Data.getKey(r,"Uni","Data")])).version===n&&OBJ.copy(t,AGB.Uni.Data[r]))},Save:function(a){a=AGB.App.getPlayer(a),AGB.Data.isStatus(a)&&OBJ.is(AGB.Uni.Data[a])&&AGB.Data.setStorage(a,"Uni","Data",AGB.Uni.Data[a])},Load:function(e){var n;AGB.App.getPlayer(e,"copy")&&((n=new XMLHttpRequest).open("GET",e.urlUni+"/api/serverData.xml?nocache="+AGB.Time.timestamp(),!0),n.overrideMimeType("text/html"),n.setRequestHeader("Cache-Control","no-cache"),n.setRequestHeader("Pragma","no-cache"),n.onerror=n.onload=function(){var t,a,r;a=AGB.App.getPlayer(e),t=AGB.Uni.Data[a],a&&t&&(200==+n.status&&n.responseText&&OBJ.iterate(AGB.Uni.Info,function(a){var e;2===(e=n.responseText.split("<"+a+">")).length&&(e=((e=(e[r=1]||"").split("<")[0])||"").trim(),t[a]="number"==typeof AGB.Uni.Info[a]?+e||0:e)}),1===r&&(t.status=1,AGB.Uni.Save(e)),AGB.Core.Log("Update   - Uni      : "+e.urlUni+"/api/serverData.xml"+(r=1,""),!0))},n.send(null))},Get:function(a,e,t){var r;return a&&AGB.Uni.Data[a]&&e&&(r=AGB.Uni.Data[a][e]),6===t?STR.check(r):+r||0}};