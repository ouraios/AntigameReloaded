AGO.Websim={ships:"202 203 204 205 206 207 208 209 210 211 212 213 214 215 401 402 403 404 405 406 407 408".split(" "),Data:[],Interactive:function(){AGO.Websim.isAntigame=Boolean("antigame"===STR.getParameter("ref",document.location.href));for(var e=0;e<16;e++)AGO.Websim.Data[e]={attacker:0,defender:0,count_attacker:0,count_defender:0};AGO.Websim.Show(),AGO.Websim.ShowResult(!0),AGO.Websim.ShowTarget(),AGO.Websim.ShowTitle(),AGO.Websim.CalculateFleet()},Show:function(){function e(e,t){var n=document.getElementsByName("ship_"+e+"_"+t+"_b")[0];n&&(n.addEventListener("change",AGO.Websim.CalculateFleet,!1),n.addEventListener("keyup",AGO.Websim.CalculateFleet,!1))}var t=document.getElementById("aswift_0_anchor");for(t&&(t.parentNode.parentNode.style.display="none"),t=document.getElementById("overlay").nextSibling;t;)"TABLE"===t.nodeName?(t.style.minWidth="900px",t=null):t=t.nextSibling;if((n=document.querySelector("input[type=reset]"))&&(DOM.set(n,null,null,{padding:"3px",marginRight:"24px"}),DOM.set(n.parentNode.querySelectorAll("input")[1],null,null,{padding:"3px",margin:"0px 10px",minWidth:"150px"})),t=document.getElementById("del_techs")){AGO.Websim.isAntigame&&(t.checked=STR.getParameter("del_techs",document.location.href));var n,a=NMR.parseInt(STR.getParameter("uni_speed",document.location.href))||1;(n=document.createElement("tr")).innerHTML="<td>"+AGO.Label.get("X04")+'</td><td><input id="uni_speed" size="3" maxlength="2" value="'+a+'"></td>',(t=t.parentNode.parentNode.parentNode).insertBefore(n,t.childNodes[3])}for((n=document.createElement("tr")).innerHTML='<td style="padding: 10px 0px;">'+AGO.Label.get("X02")+'</td><td align="center"><div id="anti_units_attacker" style="width:50px; text-align: left; padding: 5px 10px;"></div></td><td align="left" id="anti_retreat_ratio" style="width:50px; white-space: nowrap;"></td><td align="center"><div id="anti_units_defender" style="width:50px; text-align: left; padding: 5px 10px;"></div></td><td></td>',(t=document.querySelector("#shiptable tbody"))&&t.insertBefore(n,t.childNodes[1]),n=0;n<=13;n++)e("a",n);for(n=0;n<=13;n++)e("d",n);for(t=document.querySelectorAll("input[type=button], input[type=reset]"),n=0;n<t.length;n++)t[n].addEventListener("click",function(){window.setTimeout(AGO.Websim.CalculateFleet,10)},!1);(t=document.querySelector("input[onclick^=sim_ip_attack]"))&&t.addEventListener("click",function(){window.setTimeout(AGO.Websim.ShowResult,330)},!1)},ShowTitle:function(){var e="";AGO.Websim.isAntigame&&(e="honorableTarget"===(e=STR.getParameter("enemy_status",document.location.href))?"#FFFF66":"inactive"===e?"#6E6E6E":"#FFFFFF",e='<span style="padding: 0 50px;">'+STR.getParameter("uni",document.location.href)+"</span>"+STR.getParameter("enemy_name",document.location.href)+' <span style="color: white;">['+STR.getParameter("enemy_pos",document.location.href)+']</span> -  <span style="color: '+e+';">'+STR.getParameter("enemy_player",document.location.href)+"</span> - "+decodeURI(STR.getParameter("report_time",document.location.href)));e=(e=e+'<a href="javascript:void(0)" id="ago_routine_harvest" style="float: right; background-color: #344566; border: 1px solid #415680; padding: 3px; margin: 0 10px;" title=" '+AGO.Label.get("X01")+'">AGO '+AGO.Label.get("F05")+"  "+AGO.Label.get("FH0")+"</a>")+'<a href="javascript:void(0)" id="ago_routine_attack" style="float: right; background-color: #344566; border: 1px solid #415680; padding: 3px;" title=" '+AGO.Label.get("X01")+'">AGO '+AGO.Label.get("F05")+"  "+AGO.Label.get("FA0")+"</a>";var t=document.getElementById("acs");t&&(DOM.append(t.parentNode,"span",null,{color:"#6F9FC8",fontSize:"14px"}).innerHTML=e,DOM.set("ago_routine_attack","id",null,null,{click:AGO.Websim.SetAttack}),DOM.set("ago_routine_harvest","id",null,null,{click:AGO.Websim.SetHarvest}))},ShowTarget:function(){function e(e){var t=document.querySelector("input[name="+e+"]");if(t){var n=t.cloneNode(!0);n.name="original_"+e,t.parentNode.appendChild(n).addEventListener("change",AGO.Websim.CalculateResourse,!1),t.parentNode.style.minWidth="112px",t.parentNode.previousSibling.style.minWidth="70px",t.style.display="none"}}function t(e,t){return'<input type="radio" name="plunder_ratio" value="'+e+'"'+(e===t?' checked="checked"':"")+">"+e+"% "}var n=+STR.getParameter("plunder_perc",document.location.href)||50,a=document.getElementById("enemy_pos");if(a){var i=a.parentNode.parentNode.querySelectorAll("td");i[4].innerHTML=AGO.Label.get("X03")+":",i[5].innerHTML=t(50,n)+t(75,n)+t(100,n),(n=a.parentNode.appendChild(document.createElement("input"))).id="enemy_type",n.type="checkbox",n.checked=Boolean("3"===STR.getParameter("enemy_type",document.location.href)),a.parentNode.appendChild(document.createTextNode(" M"))}DOM.addEvents("input[name=plunder_ratio]",null,{click:AGO.Websim.CalculateResourse}),e("enemy_metal"),e("enemy_crystal"),e("enemy_deut"),AGO.Websim.CalculateResourse(),DOM.set("#read_field + input",null,null,null,{click:AGO.Websim.ReadResourse}),DOM.addEvents("read_field","id",{click:function(){this.value=""}})},ReadResourse:function(){window.setTimeout(function(){AGO.Websim.CalculateResourse(null,!0)},500)},CalculateResourse:function(e,n){function t(e){var t=document.querySelector("input[name=original_"+e+"]");t&&(e=document.querySelector("input[name="+e+"]"),n&&(t.value=STR.check(e.value)),e.value=STR.check(Math.floor(NMR.parseInt(t.value)*i)))}var a=document.querySelectorAll("input[name=plunder_ratio]"),i=3===a.length?a[2].checked?2:a[1].checked?1.5:1:1;n&&(n=100<document.querySelector("#read_field").value.length),t("enemy_metal"),t("enemy_crystal"),t("enemy_deut")},ShowResult:function(e){var t,n=document.getElementById("result_table");if(n){DOM.removeObserver(AGO.Websim.ObserverObject),(d=n.querySelector("table")).style.display="none";for(var a,i,l,r=d.getElementsByTagName("tr"),d=[],s=0;s<r.length;s++){var o,c=r[s].firstChild.innerHTML,u=r[s].lastChild.innerHTML,m=s,p=u;o={};var g=p.split(", ");2===g.length?(o.flag=!0,o.metal=STR.trim(g[0].split(" ")[0]),o.crystal=STR.trim(g[1].split(" ")[0]),2===(m=g[1].split(" ~ ")).length&&(g[1]=m[0],o.info="~ "+m[1]),2===(m=p.split(" (")).length&&(g[1]=m[0],o.info=m[1].split(")")[0]),3===m.length&&(g[1]="",o.metal_perc=m[1].split(")")[0],o.crystal_perc=m[2].split(")")[0],a=m[0].split(" ")[1],i=m[1].split(" ")[2]),p=g[1].split(" "),o.deuterium=3<=p.length?p[p.length-2]:0):8===m&&(o.flag=!0,o.deuterium=STR.trim(p.split(" ")[0]),l=p.split(" ")[1]),p='<td style="min-width: 80px; text-align: right; padding: 0px 6px; color: '+(6===s||7===s?"#FF9600":2===s?"#008000":4===s?"#FF0000":"")+';">',o.flag&&!e?(2===s&&(t=OBJ.create(o)),u=p+STR.check(o.metal)+'</td><td width="30">'+STR.check(o.metal_perc)+"</td>"+p+STR.check(o.crystal)+'</td><td width="30">'+STR.check(o.crystal_perc)+"</td>"+p+STR.check(o.deuterium)+'</td><td style="min-width: 80px; padding: 0px 8px; white-space: nowrap;">'+STR.check(o.info)+"</td>"):(9===s&&(o=NMR.minMax(NMR.parseInt(document.getElementById("uni_speed").value),1,100),u=AGO.Time.formatTime(Math.ceil(AGO.Time.parseTime(u)/o))+" h"),u='<td colspan="6" width="400">'+(e?"":u)+"</td>"),d.push("<tr"+("none"===r[s].style.display?' style="display: none;"':"")+'><td style="padding: 2px 15px 2px 5px; white-space: nowrap;">'+c+"</td>"+u+"</tr>")}(e=document.getElementById("anti_result_table"))||((e=n.appendChild(document.createElement("table"))).id="anti_result_table"),t={metal_debris:OBJ.get(t,"metal"),crystal_debris:OBJ.get(t,"crystal")},DOM.setData(e,null,t),t=d[3],d[3]='<tr><td style="text-align: right; padding: 10px 6px 2px 5px;" colspan="2">'+a+'</td><td style="text-align: right; padding: 10px 6px 2px 5px;" colspan="2">'+i+'</td><td style="text-align: right; padding: 10px 6px 2px 5px;" colspan="2">'+l+"</td><td></td></tr>"+d[2],d[2]=t,e.innerHTML=d.join(""),AGO.Websim.ObserverObject=DOM.addObserver(document.getElementById("result_table"),{childList:!0},AGO.Websim.Observer)}},Observer:function(e){for(var t in e)e[t].addedNodes&&"result_table"===e[t].target.id&&AGO.Websim.ShowResult()},CalculateFleet:function(){function e(e){return e<100?STR.check(e).substring(0,4):STR.check(Math.floor(e))}var t,n,a,i=document.getElementById("acs").selectedIndex;for(AGO.Websim.Data[i]={attacker:0,defender:0,count_attacker:0,count_defender:0},t=0;t<=13;t++)(n=document.getElementsByName("ship_a_"+t+"_b")[0])&&(a=NMR.parseInt(n.value),n.value=STR.check(a),0<a&&(AGO.Websim.Data[i].count_attacker+=a,AGO.Websim.Data[i].attacker+=AGO.Item[AGO.Websim.ships[t]].retreat*a));for(t=0;t<=13;t++)(n=document.getElementsByName("ship_d_"+t+"_b")[0])&&(a=NMR.parseInt(n.value),n.value=STR.check(a),0<a&&(t<=13&&(AGO.Websim.Data[i].count_defender+=a),AGO.Websim.Data[i].defender+=AGO.Item[AGO.Websim.ships[t]].retreat*a));var l=i=a=n=0;for(t=0;t<16;t++)n+=+AGO.Websim.Data[t].attacker||0,a+=+AGO.Websim.Data[t].defender||0,i+=+AGO.Websim.Data[t].count_attacker||0,l+=+AGO.Websim.Data[t].count_defender||0;document.getElementById("anti_units_attacker").innerHTML=STR.check(i),document.getElementById("anti_units_defender").innerHTML=STR.check(l),t="white",i="",n&&a&&(a<n?(i=e(n/a)+"&nbsp; : &nbsp;1",t=n<3*a?"#008000":n<5*a?"#FFFF00":"#FF4B00"):(i="1&nbsp; : &nbsp;"+e(a/n),t="#FF0000")),(n=document.getElementById("anti_retreat_ratio")).innerHTML=i,n.style.color=t},SetAttack:function(){var e,t,n;for((e=AGO.Task.splitCoords(DOM.getValue("enemy_pos","id",7))).type=DOM.getProperty("enemy_type","id","checked")?3:1,e.mission=1,e.routine=3,e.metal=DOM.getValue('input[name="original_enemy_metal"]',null,3),e.crystal=DOM.getValue('input[name="original_enemy_crystal"]',null,3),e.deuterium=DOM.getValue('input[name="original_enemy_deut"]',null,3),n=0;n<=13;n++)(t=DOM.getValue('input[name="ship_a_'+n+'_b"]',null,3))&&(e[AGO.Websim.ships[n]]=t);AGB.message("Background","Set",{key:"Fleet_Task",value:JSON.stringify(e)})},SetHarvest:function(){var e;(e=AGO.Task.splitCoords(DOM.getValue("enemy_pos","id",7))).type=2,e.mission=8,e.routine=4;var t=DOM.getData("anti_result_table","id",1);e.metal=NMR.parseIntAbs(t.metal_debris),e.crystal=NMR.parseIntAbs(t.crystal_debris),e.deuterium=0,AGB.message("Background","Set",{key:"Fleet_Task",value:JSON.stringify(e)})}},AGO.Osimulate={ships:"202 203 204 205 206 207 208 209 210 211 212 213 214 215 401 402 403 404 405 406 407 408".split(" "),Interactive:function(){AGO.Osimulate.Show()},Show:function(){var e,t,n;(e=document.getElementById("cmdSimulate"))&&((n=(t=(e=e.parentNode).cloneNode(!0)).querySelector("button"))&&(n.title=AGO.Label.get("X01"),n.innerHTML="<span>AGO "+AGO.Label.get("F05")+"  "+AGO.Label.get("FA0")+"</span>",n.addEventListener("click",AGO.Osimulate.SetAttack,!1),e.parentNode.insertBefore(t,e.parentNode.childNodes[6])),(n=(t=e.cloneNode(!0)).querySelector("button"))&&(n.title=AGO.Label.get("X01"),n.innerHTML="<span>AGO "+AGO.Label.get("F05")+"  "+AGO.Label.get("FH0")+"</span>",n.addEventListener("click",AGO.Osimulate.SetHarvest,!1),e.parentNode.insertBefore(t,e.parentNode.childNodes[7])))},SetAttack:function(){var e,t,n,a;if((e=AGO.Task.splitCoords(DOM.getValue("txtCoords","id",7))).mission=1,e.routine=3,e.metal=DOM.getValue("input#numMetallo",null,3),e.crystal=DOM.getValue("input#numCristallo",null,3),e.deuterium=DOM.getValue("input#numDeuterio",null,3),t=DOM.getText("#atk-tabs > ul > li.ui-tabs-active a",null,7)){for(a=0;a<=13;a++)(n=DOM.getValue("num"+a+t,"id",3))&&(e[AGO.Osimulate.ships[a]]=n);AGB.message("Background","Set",{key:"Fleet_Task",value:JSON.stringify(e)})}},SetHarvest:function(){var e,t,n;(t=AGO.Task.splitCoords(DOM.getValue("enemy_pos","id",7))).type=2,t.mission=8,t.routine=4,(e=document.getElementById("tdMediaDetriti"))&&(e=((n=STR.check(e.innerHTML)).split("locMetal2")[1]||"").split("<span")[0],t.metal=NMR.parseIntAbs(n.split("<")[0]),t.crystal=NMR.parseIntAbs(e)),t.deuterium=0,AGB.message("Background","Set",{key:"Fleet_Task",value:JSON.stringify(t)})}};