/* Shared Part 3 code. defer ensures the page exists before this script runs. */
'use strict';
const $=selector=>document.querySelector(selector);
const meals=[['Breakfast Taco',65],['Yoghurt and Fruit Bowl',55],['French Toast and Fresh Fruit',70],['Classic Breakfast',85],['Grilled Chicken Shawarma',80],['Chicken and Avocado Salad',85],['Creamy Chicken Pasta',90],['Grilled Chicken Rice Bowl',95],['Asian Beef and Vegetable Stir-Fry',105],['Grilled Chicken and Vegetables',100],['Beef Lasagne',110],['Vegetable Pasta',85]];
const money=value=>new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(value);
// Search filters the existing DOM cards; no user input is inserted as HTML.
const cards=[...document.querySelectorAll('article[data-category]')];
if($('#meal-search')){
 const filter=()=>{
  const query=$('#meal-search').value.trim().toLowerCase(),category=$('#category').value;
  cards.forEach(card=>{card.hidden=!(card.textContent.toLowerCase().includes(query)&&(!category||card.dataset.category===category));});
  const count=cards.filter(card=>!card.hidden).length;
  $('#search-status').textContent=count?`${count} meals found. Select a photo to enlarge it.`:'No meals found. Try another term or category.';
 };
 $('#meal-search').addEventListener('input',filter);$('#category').addEventListener('change',filter);filter();
 // Native dialog supports focus trapping, Escape and return to the opening button.
 const dialog=$('#lightbox');let index=0;
 function show(next){index=(next+cards.length)%cards.length;const img=cards[index].querySelector('img');$('#large-photo').src=img.src;$('#large-photo').alt=img.alt;$('#photo-caption').textContent=cards[index].querySelector('h3').textContent;}
 cards.forEach((card,i)=>{
  const img=card.querySelector('img'),button=document.createElement('button');button.type='button';button.className='photo-button';button.setAttribute('aria-label',`Enlarge ${img.alt}`);img.before(button);button.append(img);
  button.addEventListener('click',()=>{show(i);dialog.showModal();});
 });
 $('#close-photo').addEventListener('click',()=>dialog.close());
 $('#previous-photo').addEventListener('click',()=>show(index-1));$('#next-photo').addEventListener('click',()=>show(index+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
}
// Approximate area centres, not fictional shop addresses or guaranteed boundaries.
if($('#delivery-map')&&window.L){
 const areas={'Johannesburg Central':[-26.2041,28.0473],Braamfontein:[-26.1929,28.0319],Rosebank:[-26.1467,28.0436],Sandton:[-26.1076,28.0567],Randburg:[-26.0936,28.0064]};
 const map=L.map('delivery-map').setView([-26.15,28.04],11),markers={};
 const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
 tiles.on('tileerror',()=>{$('#map-status').textContent='Map tiles failed to load. Use the area list or OpenStreetMap link.';});
 tiles.on('load',()=>{$('#map-status').textContent='Pan, zoom, or select a service area. Markers show approximate area centres.';});
 Object.entries(areas).forEach(([name,coords])=>{markers[name]=L.marker(coords).addTo(map).bindPopup(`${name}: delivery subject to confirmation.`);});
 $('#map-area').addEventListener('change',e=>{const name=e.target.value;if(name){map.setView(areas[name],13);markers[name].openPopup();}else{map.setView([-26.15,28.04],11);map.closePopup();}});
}
// Derive tomorrow from Johannesburg's calendar date rather than the visitor's timezone.
function tomorrow(){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Johannesburg',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
 const get=type=>parts.find(part=>part.type===type).value;
 const date=new Date(`${get('year')}-${get('month')}-${get('day')}T12:00:00Z`);date.setUTCDate(date.getUTCDate()+1);return date.toISOString().slice(0,10);
}
if($('#meal'))meals.forEach(([name,price],i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=`${name} — ${money(price)}`;$('#meal').append(option);});
if($('#delivery-date'))$('#delivery-date').min=tomorrow();
// Optional AJAX endpoint is read from config.js. Never put private service keys here.
document.querySelectorAll('form').forEach(form=>{
 form.noValidate=true;const fields=[...form.querySelectorAll('input,select,textarea')],result=form.querySelector('[role="status"]');
 function validate(field){
  field.setCustomValidity('');
  if(field.required&&!field.value.trim())field.setCustomValidity('Please complete this field.');
  else if(field.id==='fullname'&&field.value.trim().length<2)field.setCustomValidity('Enter at least two characters.');
  else if(field.id==='phone'&&!/^(0[1-9]\d{8}|\+27[1-9]\d{8})$/.test(field.value))field.setCustomValidity('Use 10 digits starting with 0, or +27 followed by 9 digits, without spaces.');
  else if(field.id==='message'&&field.required&&field.value.trim().length<10)field.setCustomValidity('Enter a message of at least 10 characters.');
  else if(field.id==='meal'&&['everyday','monthly'].includes($('#enquiry-type').value)&&!field.value)field.setCustomValidity('Select a meal for the estimate.');
  else if(field.id==='delivery-date'&&field.value<tomorrow())field.setCustomValidity('Choose tomorrow or a later date.');
  else if(field.id==='delivery-time'&&field.value&&$('#delivery-date').value){
   const day=new Date(`${$('#delivery-date').value}T12:00:00Z`).getUTCDay(),start=day===0||day===6?'08:00':'07:00',end=day===0?'16:00':day===6?'18:00':'20:00';
   if(field.value<start||field.value>end)field.setCustomValidity(`Choose ${start}–${end}. Holiday hours must be confirmed.`);
  }
  const error=$(`#${field.id}-error`);if(error)error.textContent=field.validity.valid?'':field.validationMessage;
  field.setAttribute('aria-invalid',String(!field.validity.valid));return field.validity.valid;
 }
 fields.forEach(field=>{
  field.addEventListener('blur',()=>validate(field));
  field.addEventListener('input',()=>{if(field.getAttribute('aria-invalid')==='true')validate(field);result.replaceChildren();});
  field.addEventListener('change',()=>{validate(field);result.replaceChildren();});
 });
 form.addEventListener('reset',()=>{fields.forEach(field=>{field.setCustomValidity('');field.removeAttribute('aria-invalid');const error=$(`#${field.id}-error`);if(error)error.textContent='';});result.replaceChildren();});
 form.addEventListener('submit',async e=>{
  e.preventDefault();const valid=fields.map(validate);
  if(valid.includes(false)){result.textContent='Please correct the highlighted fields.';fields[valid.indexOf(false)].focus();return;}
  if(form.id==='enquiry-form'){
   const type=$('#enquiry-type').value;let response;
   if(['everyday','monthly'].includes(type)){const [name,price]=meals[Number($('#meal').value)],quantity=Number($('#quantity').value);response=`${quantity} portions of ${name}: ${money(quantity*price)} before delivery. Monthly planning uses the listed per-portion price; this is not a full-month quote.`;}
   else response='This service needs a tailored quote. Price and requirements must be confirmed.';
   result.textContent=`${response} Requested ${$('#delivery-date').value} at ${$('#delivery-time').value}, ${$('#delivery-area').selectedOptions[0].textContent}. Availability, delivery fees and dietary requirements need confirmation. Nothing has been sent or booked.`;result.focus();return;
  }
  const endpoint=window.CONTACT_ENDPOINT;
  if(endpoint){
   const button=form.querySelector('[type="submit"]'),controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);button.disabled=true;result.textContent='Sending message…';
   try{const response=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});if(!response.ok)throw new Error('Submission failed');result.textContent='The configured form service accepted your message. Email delivery depends on the service configuration.';}
   catch(error){result.textContent='Submission failed. Your entries remain here; try again or use the email address above.';}
   finally{clearTimeout(timer);button.disabled=false;}
  }else{
   const subject=`My Private Chef: ${$('#message-type').value}`,body=`Name: ${$('#fullname').value.trim()}\nEmail: ${$('#email').value}\nPhone: ${$('#phone').value}\n\n${$('#message').value.trim()}`;
   const link=document.createElement('a');link.href=`mailto:info@myprivatechef.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;link.textContent='Open draft in your email app';
   const preview=document.createElement('pre');preview.textContent=`To: info@myprivatechef.co.za\nSubject: ${subject}\n\n${body}`;
   result.replaceChildren('Draft prepared — not sent. Verify the recipient before sending. ',link,preview);
  }
 });
});
