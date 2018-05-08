var $;AGO.Empire={Units:[],Messages:function(e,t){AGO.dummy=e+t},Ready:function(){AGO.Empire.enabled=AGO.Option.is("G20"),AGO.Empire.improve=AGO.Option.isAnd("G20","G21"),$="jQuery"in window?window.jQuery:null,AGO.Empire.Show()},Show:function(){var e,t,i,r,o,a,n,s,l={},m=AGO.Item.create(["Ship","Defense","Mining","Station","Research"]);if(AGO.Empire.improve&&(e=180+106*$(".planet").size(),DOM.set("mainWrapper","id",null,{width:e+"px"})),e=document.querySelector(".planet.summary")){for(l={metal:DOM.getText("div.metal",e,2),crystal:DOM.getText("div.crystal",e,2),deuterium:DOM.getText("div.deuterium",e,2),capacity:0},AGO.Task.updateResources(l),r={1:"metal",2:"crystal",3:"deuterium"},t=e.querySelectorAll(".supply.groupsupply > div"),a=0;a<t.length;a++)for(n in r)DOM.hasClass(t[a],null,n)&&(s=DOM.getAttribute(t[a],null,"title"),l[r[n]+"Production"]=NMR.parseIntAbs(/.*\>([0-9.]+)\<.*\>([0-9.]+)\<.*\>([0-9.]+)\<.*/.exec(s)[1]));AGO.Empire.improve&&DOM.setText(".items.groupitems + div",e,l.resources,3)}if(AGO.Empire.improve)for(n in DOM.iterate(document.querySelectorAll(".planet .resources .deuterium"),function(e){DOM.removeClass(e,null,"box-end")}),(t=document.querySelector("div.header"))&&(t=t.querySelector(".deuterium"))&&(DOM.removeClass(t,null,"catbox-end"),i=DOM.appendLI(null,"catbox-end"),DOM.appendSPAN(i,null,"F23",10),DOM.after(t,i)),t=$("div.header"),m)0===t.find("li."+n).size()&&delete m[n];$(".planet").not(".summary").each(function(){var e,t,r,a,n;for(r in a=STR.check(DOM.getAttribute(this,null,"id",3)),n={metal:DOM.getText(".metal span",this,2),crystal:DOM.getText(".crystal span",this,2),deuterium:DOM.getText(".deuterium span",this,2),energy:DOM.getText('div.planetDataTop span[class$="mark"]',this,2),capacity:0},AGO.Task.updateResources(n),AGO.Empire.improve&&DOM.setText(".items.groupitems + div",this,n.resources,3),m)(e=$(this).find("div."+r).get(0))&&(r in AGO.Item.Ship||r in AGO.Item.Defense?(n[r]=DOM.getText(e,null,3),r in AGO.Item.Ship&&AGO.Item[r].capacity&&n[r]&&(n.capacity+=n[r]*AGO.Item[r].capacity)):(r in AGO.Item.Mining||r in AGO.Item.Station||r in AGO.Item.Research)&&((t=e.querySelector("span.disabled"))?(n[r]=DOM.getText(t,null,3),AGO.Empire.improve&&"199"!==r&&"212"!==r&&-1===DOM.getText(t).indexOf("-")&&AGO.Empire.appendTooltip(t,r,n,l)):n[r]=DOM.getText("a",e,3)));AGO.Empire.Units.length||AGO.Empire.Units.push({planet:"account",tabs:["Research"],data:OBJ.create(n)}),AGO.Empire.Units.push({planet:a,tabs:["Resource","Mining","Station","Ship","Defense"],data:OBJ.create(n)}),l.capacity+=n.capacity,AGO.Empire.improve&&(e=this.querySelector(".deuterium"))&&(i=DOM.appendDIV(null,"odd box-end"),o=n.capacity<n.resources?"disabled":"",DOM.appendSPAN(i,o,n.capacity,3),DOM.after(e,i))}),AGO.Empire.Units.length&&AGB.message("Units","Action",{list:AGO.Empire.Units},function(){AGO.Units.status=1}),AGO.Empire.improve&&(i=DOM.appendDIV(null,"odd box-end"),o=l.capacity<l.resources?"disabled":"",DOM.appendSPAN(i,o,l.capacity,3),DOM.after(e.querySelector(".deuterium"),i))},appendTooltip:function(e,t,r,a){var n,i,o,s,l,m;l=r[t],n=AGO.Item[t].metal?Math.floor(AGO.Item[t].metal*Math.pow(AGO.Item[t].factor,l)):0,i=AGO.Item[t].crystal?Math.floor(AGO.Item[t].crystal*Math.pow(AGO.Item[t].factor,l)):0,o=AGO.Item[t].deuterium?Math.floor(AGO.Item[t].deuterium*Math.pow(AGO.Item[t].factor,l)):0,s="1"===t||"2"===t?10:"3"===t?20:0,s=Math.ceil(s*(l+1)*Math.pow(1.1,l+1))-Math.ceil(s*l*Math.pow(1.1,l)),t=(t='<div style="text-align:center"><span style="font-size:1.8em;font-weight:bold;">'+AGO.Label.get(t,1)+"</span><br/>")+'<span style="font-size:1.5em;font-weight:bold;">next level: '+(l+1)+"</span><br/><br />",l=Math.floor((n+i+o)/1e3),t+='<span style="text-decoration:underline;font-weight:bold;">costs </span>',t+='(<span style="text-decoration:underline;font-style:italic;">'+STR.formatNumber(l)+" points</span>)",t+='<span style="text-decoration:underline;font-weight:bold;">:</span><br/>',0<n&&(t+='<span style="color:#FFCC00">metal: '+STR.formatNumber(n)+"</span><br/>"),0<i&&(t+='<span style="color:#FFCC00">crystal: '+STR.formatNumber(i)+"</span><br/>"),0<o&&(t+='<span style="color:#FFCC00">deuterium: '+STR.formatNumber(o)+"</span><br/>"),0<s&&(t+='<span style="color:#FFCC00">energy: '+STR.formatNumber(s)+"</span><br/>"),t+='<span style="font-size:0.9em;">(small cargo: '+STR.formatNumber(Math.ceil((n+i+o)/5e3))+" or large cargo: "+STR.formatNumber(Math.ceil((n+i+o)/25e3))+")</span><br/>",t+="<br />",t+='<span style="text-decoration:underline;font-weight:bold;">ressources needed (planet):</span><br/>',(m=0)<(l=n-r.metal)&&(t+="metal: "+STR.formatNumber(l)+"<br/>",m+=l),0<(l=i-r.crystal)&&(t+="crystal: "+STR.formatNumber(l)+"<br/>",m+=l),0<(l=o-r.deuterium)&&(t+="deuterium: "+STR.formatNumber(l)+"<br/>",m+=l),0<m&&(t+='<span style="font-size:0.9em;">(small cargo: '+STR.formatNumber(Math.ceil(m/5e3))+" or large cargo: "+STR.formatNumber(Math.ceil(m/25e3))+")</span><br/>"),0<s&&s>r.energy&&(t+="<br />",l=s-r.energy,t+='<span style="text-decoration:underline;font-weight:bold;">energy needed:</span> '+STR.formatNumber(l)+"<br/>"),0<n-a.metal||0<i-a.crystal||0<o-a.deuterium?(t+="<br />",t+='<span style="text-decoration:underline;font-weight:bold;">ressources needed (account):</span><br/>',(r=0)<(l=n-a.metal)&&(t+="metal: "+STR.formatNumber(l)+"<br/>",0<a.metalProduction&&(r<(n=l/a.metalProduction)&&(r=n))),0<(l=i-a.crystal)&&(t+="crystal: "+STR.formatNumber(l)+"<br/>",0<a.crystalProduction&&(r<(n=l/a.crystalProduction)&&(r=n))),0<(l=o-a.deuterium)&&(t+="deuterium: "+STR.formatNumber(l)+"<br/>",0<a.deuteriumProduction&&(r<(n=l/a.deuteriumProduction)&&(r=n))),0<r&&(t+="<br />",t+='<span style="text-decoration:underline;font-weight:bold;">you will have enough ressources<br/>in your account in:</span><br/>',t+='<span style="color:orange;font-weight:bold;font-size:1.2em;">'+AGO.Time.formatTime(Math.floor(3600*r),!0)+"</span><br/>",t+='<span style="color:#CCCCCC;font-size:1.0em;">'+(l=new Date(1e3*(AGO.Acc.timestamp+Math.ceil(3600*r)))).toLocaleString()+"</span><br/>")):(t+="<br />",t+='<span style="color:lime;font-weight:bold;font-size:1.2em;">there are enough ressources<br/>in your account</span><br/>'),t+="</div>",DOM.setAttribute(e,null,"title",t),DOM.addClass(e,null,"tooltipRight")}};